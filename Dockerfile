# syntax=docker/dockerfile:1

FROM python:3.7-slim

WORKDIR /bank-loan-status

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
EXPOSE 5000

COPY . .

CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0"]
