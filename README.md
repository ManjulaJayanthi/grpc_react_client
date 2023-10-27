1. Global install:
    npm install -g protoc-gen-grpc-web
    npm install -g protoc-gen-js
    npm install -g google-protobuf
    npm install -g grpc-web

2. How to compile Proto:
    cd /proto   
    protoc -I=. *.proto --js_out=import_style=commonjs:../src/proto_out --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../src/proto_out

3. curl command to get grpc:
    grpcurl -plaintext -import-path proto -proto blog.proto 127.0.0.1:50052 blog.BlogRunTime/GetBlogg

4. Compile Compile...
    $ cd /path/to/proto/folder # make sure to enter the proto folder to run the command from there
    $ protoc -I="./" --plugin=protoc-gen-grpc-java=/path/to/protoc-gen-grpc-java --grpc-java_out="./../java/src/main/java" --java_out="./../java/src/main/java" "./greet.proto"

5. let’s understand the command:
    protoc: is the compiler
    -I: a flag to determine the location of the proto files (in our case in the current location)
    — plugin: is the flag we used to determine to which language we want to convert our ptoto file
    — --grpc-web_out && --js_out: both need to generate object and service from the proto file so you need to specify the location where to geenrate those files
    “*.proto”: name of the file to generate

