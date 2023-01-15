# syntax=docker/dockerfile:1

FROM python:3.7-slim

WORKDIR /bank-loan-status

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt


COPY . .

EXPOSE 5000/tcp
EXPOSE 5000/udp
CMD [ "python", "-m" , "flask", "run", "--host=0.0.0.0", "--port=5000"]
