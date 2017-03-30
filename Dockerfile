FROM node:6

EXPOSE 8000:8000

WORKDIR /shintech

COPY . .

RUN echo "Starting..." && \
  yarn global add webpack && \
  rm -rv node_modules build --force && \
  printf "Creating file directories...\n" && \
  mkdir build && \
  mkdir build/static 
  
RUN printf "Copying resources...\n"
COPY resources build/resources

RUN printf "Installing dependencies...\n" &&\
  yarn install && \

  printf "Building in progress...\nPlease wait...\n" && \
  webpack && \
  npm run babel:build && \
  printf "Starting..." && \
  npm start


# # COPY resources build
# RUN ls -l build && \
#   printf "shintech" && \
#   ls /shintech