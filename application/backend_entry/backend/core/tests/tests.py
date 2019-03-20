class createAsset():
  es_config = {
      "settings": {
          "index.max_ngram_diff": 18,
          "index.number_of_replicas": 1,
          "index.number_of_shards": 6,
          "analysis": {
              "filter": {
                  "nGram_filter": {
                      "type": "nGram",
                      "min_gram": 2,
                      "max_gram": 20,
                      "token_chars": [
                          "letter",
                          "digit",
                          "punctuation",
                          "symbol"
                      ]
                  }
              },
              "analyzer": {
                  "nGram_analyzer": {
                      "type": "custom",
                      "tokenizer": "whitespace",
                      "filter": [
                          "lowercase",
                          "asciifolding",
                          "nGram_filter"
                      ]
                  },
                  "whitespace_analyzer": {
                      "type": "custom",
                      "tokenizer": "whitespace",
                      "filter": [
                          "lowercase",
                          "asciifolding"
                      ]
                  }
              }
          }
      },
      'index_name': 'asset',
      'type_name': 'assets',
      'mapping': {
          "properties": {
              "folder_id": {
                  "type": "keyword"
              },
              "id": {
                  "type": "keyword"
              },
              "name": {
                  "type": "text",
                  "analyzer": "nGram_analyzer",
                  "search_analyzer": "whitespace_analyzer",
                  "boost": 5
              },
              "organisation_id": {
                  "type": "keyword"
              },
              "metadata": {
                  "properties": {
                      "file_type": {
                          "type": "keyword"
                      },
                      "status": {
                          "type": "keyword"
                      },
                      "tags": {
                          "type": "text",
                          "analyzer": "nGram_analyzer",
                          "search_analyzer": "whitespace_analyzer"
                      },
                      "description": {
                          "type": "text",
                          "analyzer": "whitespace_analyzer"
                      },
                      "category": {
                          "type": "text",
                          "analyzer": "nGram_analyzer",
                          "search_analyzer": "whitespace_analyzer"
                      }
                  }
              }
          }
      }
  }

  def __init__(self, params):
    self.params = params


class createFolders():
  es_config = {
      "settings": {
          "index.max_ngram_diff": 18,
          "index.number_of_replicas": 1,
          "index.number_of_shards": 6,
          "analysis": {
              "filter": {
                  "nGram_filter": {
                      "type": "nGram",
                      "min_gram": 2,
                      "max_gram": 20,
                      "token_chars": [
                          "letter",
                          "digit",
                          "punctuation",
                          "symbol"
                      ]
                  }
              },
              "analyzer": {
                  "nGram_analyzer": {
                      "type": "custom",
                      "tokenizer": "whitespace",
                      "filter": [
                          "lowercase",
                          "asciifolding",
                          "nGram_filter"
                      ]
                  },
                  "whitespace_analyzer": {
                      "type": "custom",
                      "tokenizer": "whitespace",
                      "filter": [
                          "lowercase",
                          "asciifolding"
                      ]
                  }
              }
          }
      },
      'index_name': 'folder',
      'type_name': 'folders',
      'mapping': {
          "properties": {
              "id": {
                  "type": "keyword"
              },
              "name": {
                  "type": "text",
                  "analyzer": "nGram_analyzer",
                  "search_analyzer": "whitespace_analyzer"
              },
              "organisation_id": {
                  "type": "keyword"
              }
          }
      }
  }

  def __init__(self, params):
    self.params = params


class deleteFolders():
  es_config = {
      'index_name': 'asset',
      'type_name': 'assets'
  }
  def __init__(self, params):
    self.params = params
