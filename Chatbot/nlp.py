import tensorflow as tf
from nltk import word_tokenize, SnowballStemmer
sStemmer = SnowballStemmer("german")
import re

class Nlp:

    def tokenizeSentence(self, sentence: str):
        return word_tokenize(sentence, language="german")

    def normalizeSentence(self, sentence: str):
        PATTERN = r'[^a-zA-Z0-9 äöüß]'
        return re.sub(PATTERN,'', sentence)

    def stemWords(self, words: list):
        return [sStemmer.stem(word.lower()) for word in words]

