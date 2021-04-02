import pandas as pd
import json
import os 
dir_path = os.path.dirname(os.path.realpath(__file__))

class Data:
    def provideData(self):
        intents_data = pd.read_json(dir_path + '/' + "intents.json")
        return intents_data

    def createDataFrame(self, label_id: list, label: list, pattern_words: list):
        return pd.DataFrame({"label_id": label_id, "label": label, "pattern_words": pattern_words})