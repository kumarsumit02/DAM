#!/bin/bash
python /application/backend/manage.py runserver 0.0.0.0:8000 & 
cd /application/frontend
npm start