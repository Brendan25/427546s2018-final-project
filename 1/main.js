//Functions needed:

//Mouse position tracker
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var varX = (evt.clientX - rect.left);
    var varY = (evt.clientY - rect.top);
    return{
        x: varX,
        y: varY
    };
}

window.onload = function() {
    var canvas = document.getElementById("mainCanvas");
    var canWidth = canvas.width;
    var canHeight = canvas.height;
    var vertices = new Array();
    var vLayer = 0;
    vertices[vLayer] = new Array();
    var toggle = 0;
    
    var vertexCount = 0;
    
    var gl = canvas.getContext("webgl");
    
    document.getElementById("front").addEventListener("click", function(){toggle = 0;});
    document.getElementById("side").addEventListener("click", function(){toggle = 1;});
    document.getElementById("top").addEventListener("click", function(){toggle = 2;});
    document.getElementById("new").addEventListener("click", function(){
        vLayer = vLayer + 1;
        vertices[vLayer] = new Array();
    });
    
    document.getElementById("erase").addEventListener("click", function(){
        gl.clear();
        vertices.empty();
    });
    
    document.getElementById("mainCanvas").addEventListener("click", function(evt){
        var mousePosition = getMousePosition(canvas, evt);
        var newX = mousePosition.x / gl.canvas.width * 2 - 1;
        var newY = mousePosition.y / gl.canvas.height * 2 - 1;
        var vertex_buffer;
        //All toggle does in this version of the project is determine the camera position, meaning which variable between x, y, and z is being ignored.
        //Front: z, Right: x, Top: y;
        switch(toggle) {
            case 0:
                //Front View
                if(vertices[vLayer].length == 0) {
                    vertices[vLayer] = new Array();
                    vertices[vLayer][0] = newX;
                    vertices[vLayer][1] = newY;
                    vertices[vLayer][2] =  0.99;
                } else {
                    vertices[vLayer][vertices[vLayer].length] = newX;
                    vertices[vLayer][vertices[vLayer].length] = newY;
                    vertices[vLayer][vertices[vLayer].length] = 1.0;
                }
                break;
            case 1:
                //Side-right View
                if(vertices[vLayer].length == 0) {
                    vertices[vLayer] = new Array();
                    vertices[vLayer][0] = 1.0;
                    vertices[vLayer][1] = newY;
                    vertices[vLayer][2] = newX;
                } else {
                    vertices[vLayer][vertices[vLayer].length] = 1.0;
                    vertices[vLayer][vertices[vLayer].length] = newY;
                    vertices[vLayer][vertices[vLayer].length] = newX;
                }
                break;
            case 2:
                //Top View
                if(vertices[vLayer].length == 0) {
                    vertices[vLayer] = new Array();
                    vertices[vLayer][0] = newX;
                    vertices[vLayer][1] = 1.0;
                    vertices[vLayer][2] = newY;
                } else {
                    vertices[vLayer][vertices[vLayer].length] = newX;
                    vertices[vLayer][vertices[vLayer].length] = 1.0;
                    vertices[vLayer][vertices[vLayer].length] = newY;
                }
                break;
        }
        if(vertices.length > 0) {
            //This function erases the board and re-draws the shape every time a new point is added.
            //Gets the vertices from the vertices array.
            //Greater than 3 because 3 coordinates per point.
            var j;
            for(j = 0; j <= vLayer; j++) {
                if(vertices[j].length > 0) {
                /*
                    vertex_buffer = gl.createBuffer();
                    gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
                    gl.bufferData(gl.ARRAY_BUFFER, new Uint16Array(vertices[j]), gl.STATIC_DRAW);
                    gl.bindBuffer(gl.ARRAY_BUFFER, null);

                    var vertCode =
                    'attribute vec2 coordinates;' + 
                    'void main(void) {' + ' gl_Position = vec4(coordinates, 0.0, 1.0);' + '}';

                     //Create a vertex shader object
                     var vertShader = gl.createShader(gl.VERTEX_SHADER);

                     //Attach vertex shader source code
                     gl.shaderSource(vertShader, vertCode);

                     //Compile the vertex shader
                     gl.compileShader(vertShader);

                     //Fragment shader source code
                     var fragCode = 'void main(void) {' + 'gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);' + '}';

                     // Create fragment shader object
                     var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

                     // Attach fragment shader source code
                     gl.shaderSource(fragShader, fragCode);

                     // Compile the fragment shader
                     gl.compileShader(fragShader);

                     // Create a shader program object to store combined shader program
                     var shaderProgram = gl.createProgram();

                     // Attach a vertex shader
                     gl.attachShader(shaderProgram, vertShader); 

                     // Attach a fragment shader
                     gl.attachShader(shaderProgram, fragShader);

                     // Link both programs
                     gl.linkProgram(shaderProgram);

                     // Use the combined shader program object
                     gl.useProgram(shaderProgram);

                    //Bind vertex buffer object
                     gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

                     //Get the attribute location
                     var coord = gl.getAttribLocation(shaderProgram, "coordinates");

                     //point an attribute to the currently bound VBO
                     gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);

                     //Enable the attribute
                     gl.enableVertexAttribArray(coord);

                    // Clear the canvas
                     gl.clearColor(0.5, 0.5, 0.5, 0.9);

                     // Enable the depth test
                     gl.enable(gl.DEPTH_TEST); 

                     // Clear the color buffer bit
                     gl.clear(gl.COLOR_BUFFER_BIT);

                     // Set the view port
                     gl.viewport(0, 0, canvas.width, canvas.height);

                     // Draw the triangle
                     gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertices[j].length);
                */
                }
            }
        } else {
            
        }
    });
}

//A function that takes each point given by the user and draws vertexes between them to create polygons

//A cancel function triggered by button press that completes the current polygon.

//Three view buttons that rotate the camera's view of the object being made, one for the default, one for above, and one for the right-hand side

//A color selector which selects the color of the polygon being made.