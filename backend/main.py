from flask import Flask, Response, request
from werkzeug.utils import secure_filename
from openai import ChatCompletion
# from helpers import construct_prompt, preprocess_file
from helpers import HelperFunctions
from config import ALLOWED_FILE_EXTENSIONS, UPLOAD_FOLDER
from os import path, environ
app = Flask(__name__)

helper_functions = HelperFunctions()

global filename, query
@app.route('/completion', methods=['GET', 'POST'])
def completion():
    global filename, query
    if request.method == 'POST':
        query = request.form["query"]
        filename = secure_filename(request.form["currentDocument"])
        return "success", 200

    # prompt = construct_prompt(query, filename)
    prompt = helper_functions.construct_prompt(query)

    def stream():
        completion = ChatCompletion.create(
            temperature=0,
            stream=True, 
            model="gpt-3.5-turbo", 
            messages=[{"role": "user", "content": prompt},],)    
        
        for line in completion:
            chunk = line['choices'][0]['delta']
            yield 'data: %s\n\n' % chunk.get("content", "")
    return Response(stream(), mimetype='text/event-stream')


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_FILE_EXTENSIONS

@app.route('/upload', methods = ['POST'])
def upload():
    file = request.files["doc"]
    if file:
        filename = secure_filename(file.filename)
        file.save(path.join(UPLOAD_FOLDER, filename))
        if allowed_file(filename):
        #    preprocess_file(filename=filename)
           helper_functions.preprocess_file(filename=filename)
        else:
           return 'bad file extension!', 400
    return "success", 200

if __name__ == "__main__":
    app.run(debug=False, host="0.0.0.0", port=int(environ.get("PORT", 5000)))