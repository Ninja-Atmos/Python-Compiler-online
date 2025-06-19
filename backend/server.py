from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
from io import StringIO
import contextlib
import logging
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Get allowed origins from environment variable or use default
ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', '*').split(',')

# Configure CORS with explicit settings
CORS(app, resources={
    r"/*": {
        "origins": ALLOWED_ORIGINS,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept"],
        "supports_credentials": True
    }
})

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Accept')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
    return response

@app.route('/run', methods=['POST', 'OPTIONS'])
def run_code():
    if request.method == 'OPTIONS':
        return '', 200
        
    try:
        logger.info("Received code execution request")
        code = request.json.get('code', '')
        stdin = request.json.get('stdin', '')
        
        if not code:
            return jsonify({'error': 'No code provided'}), 400
        
        # Create StringIO objects to capture stdout, stderr, and provide stdin
        stdout_capture = StringIO()
        stderr_capture = StringIO()
        stdin_capture = StringIO(stdin)
        
        # Save original stdin
        original_stdin = sys.stdin
        
        # Redirect stdout, stderr, and patch stdin
        with contextlib.redirect_stdout(stdout_capture), contextlib.redirect_stderr(stderr_capture):
            sys.stdin = stdin_capture
            try:
                # Add timeout to prevent infinite loops
                exec(code)
            except Exception as e:
                return jsonify({'error': str(e)})
            finally:
                sys.stdin = original_stdin
        
        # Get the captured output
        stdout_output = stdout_capture.getvalue()
        stderr_output = stderr_capture.getvalue()
        
        if stderr_output:
            return jsonify({'error': stderr_output})
        else:
            return jsonify({'output': stdout_output})
            
    except Exception as e:
        logger.error(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)})

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    host = os.getenv('HOST', '0.0.0.0')
    debug = os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    
    logger.info(f"Starting server on {host}:{port} (debug={debug})")
    app.run(debug=debug, port=port, host=host) 