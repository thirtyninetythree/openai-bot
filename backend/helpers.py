from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.document_loaders import TextLoader
from langchain.document_loaders import Docx2txtLoader
from langchain.document_loaders import UnstructuredPDFLoader

from config import OPENAI_API_KEY, UPLOAD_FOLDER
import openai
openai.api_key = OPENAI_API_KEY

class HelperFunctions:
   init_every_request = False
   
   def __init__(self):
        self.vectorstore = None

   def construct_prompt(self, query):
      docs = self.vectorstore.similarity_search(query, k=10)
      context = ""
      for doc in docs:
        context += doc.page_content

      header = """
      You're a helpful assistant called SOMA.
      Answer the question as truthfully as possible using the provided context, 
      and if the answer is not contained within the context below, say "I can't tell from the documents provided."
      \n\nContext:\n"""
      
      prompt = header + context +  "\n\n Q: " + query + "\n A:"
      return prompt
   
   def preprocess_file(self, filename):
      loader = TextLoader(f"{UPLOAD_FOLDER}/{filename}")
      filetype = filename.rsplit('.', 1)[1].lower()
      if filetype == "pdf":
        #convert pdf to text
        loader = UnstructuredPDFLoader(filename)
      elif filetype == "docx":
        loader = Docx2txtLoader(filename)

      #convert word to text
      documents = loader.load()
      # split text
      text_splitter = CharacterTextSplitter(chunk_size=200, chunk_overlap=20)
      docs = text_splitter.split_documents(documents)
      embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
      self.vectorstore = FAISS.from_documents(docs, embeddings)

