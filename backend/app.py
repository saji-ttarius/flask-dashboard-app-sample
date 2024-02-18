import psutil
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')


@app.route("/api/server-status")
def server_status():
    """
    This function is used to get the disk usage and CPU usage of the system.

    Args:
        None

    Returns:
        A JSON object containing the disk usage and CPU usage of the system.

    """
    disk_usage = psutil.disk_usage("/").percent
    cpu_usage = psutil.cpu_percent(interval=1)
    return jsonify({"diskUsage": disk_usage, "cpuUsage": cpu_usage})


if __name__ == "__main__":
    app.run(debug=True)
