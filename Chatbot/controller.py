from nlp import Nlp
from data import Data
from tmodel import Tmodel
from keras.preprocessing.text import Tokenizer, one_hot
from keras.preprocessing.sequence import pad_sequences
import numpy as np

# libs fuer das Lernmodell
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense, Activation, Dropout, Flatten
from keras.layers.embeddings import Embedding
from keras.optimizers import SGD
from keras.utils import to_categorical
import random


from keras.utils import to_categorical
from keras.layers import LSTM



class Controller:
    def __init__(self):
        self.nlp = Nlp()
        self.data = Data()
        self.tmodel = Tmodel()

    def preprocessingData(self, data):
        label_id = []
        label = []
        pattern_words = []
        all_word_list = [] # Liste mit allen in Pattern erhaltenen Wörtern / stemmed
        
        for row in range(data.shape[0]):
            for pattern in data["patterns"][row]:
                normalized_pattern = self.nlp.normalizeSentence(pattern)
                words = self.nlp.tokenizeSentence(normalized_pattern)
                words = self.nlp.stemWords(words)
                all_word_list.extend(words)
                label_id.append(data["id"][row])
                label.append(data["label"][row])
                # pattern_words.append(words)
                pattern_words.append(' '.join(words))
                
        return {
                "df": self.data.createDataFrame(label_id, label, pattern_words),
                "unique_word_list": sorted(list(set(all_word_list)))
                }

    def create_x(self, processedObj: dict):
        x = []
        for row in range(processedObj["df"].shape[0]):
            bow = []
        
            for word in processedObj["unique_word_list"]:
                if word in processedObj["df"]["pattern_words"][row]:
                    bow.append(1)
                else:
                    bow.append(0)
            x.append(bow)

        return np.array(x)

    def create_y(self, data, processedObj: dict):
        labelDict = {}
        for row in range(data.shape[0]):
            if data["label"][row] not in labelDict:
                labelDict[data["label"][row]] = row

        labels = []
        for row in range(processedObj["df"].shape[0]):
            labels.append(labelDict[processedObj["df"]["label"][row]])

        unique_labels = list(set(labels))
        return np.array(to_categorical(labels, num_classes=len(unique_labels)))



    def model(self, x, y):
        #======Training model: 3 Layer mit 256, 128, und Anzahl Intent-classes an Neuronen======#
        model = Sequential()
        model.add(Dense(128, input_shape=(x.shape[1],), activation='relu'))
        model.add(Dropout(0.5))
        model.add(Dense(64, activation='relu'))  
        model.add(Dropout(0.5))
        model.add(Dense(y.shape[1], activation='softmax'))

        # SDG =  Stochastic gradient descent
        sgd = SGD(lr=1e-2, decay=1e-2, momentum=0.9, nesterov=True)
        model.compile(optimizer=sgd, loss='categorical_crossentropy', metrics=['accuracy'])
        print(model.summary())

        hist = model.fit(x, y, epochs=150, batch_size=5, verbose=1)
        model.save('model.h5', hist)

    def run(self):
        data = self.data.provideData()

        print("Processing Data")
        processedObj = self.preprocessingData(data)

        print("Generating Trainingsset")
        x = self.create_x(processedObj)
        y = self.create_y(data, processedObj)

        print("Train Model")
        self.model(x, y)


        print("model created")





       
        