# Step 1: Build stage
FROM python:3.9-alpine as build-stage

WORKDIR /app

# Install dependencies with no cache to keep the image lightweight
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY ./app /app/app

# Step 2: Final stage (runtime)
FROM python:3.9-alpine

WORKDIR /app

# Copy from the build stage
COPY --from=build-stage /app /app

# Expose the FastAPI default port
EXPOSE 8000

# Command to run the FastAPI app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
