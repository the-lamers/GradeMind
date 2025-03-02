
FROM python:3.10
RUN mkdir /backend
WORKDIR /backend
COPY requirements.txt /backend/requirements.txt
RUN pip install --upgrade pip && \
    pip install -r requirements.txt
RUN pip install SpeechRecognition
RUN apt update && apt install -y ffmpeg
COPY . .

