function toggleCanvas() {
    document.getElementById("front").style.display = "none";
    document.getElementById("side").style.display = "none";
    document.getElementById("top").style.display = "none";
    document.getElementById("master").style.display = "block";
}

function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var varX = (evt.clientX - rect.left);
    var varY = (evt.clientY - rect.top);
    return{
        x: varX,
        y: varY
    };
}


function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) {
    return shader;
  }

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}

function radToDeg(convert) {
    return convert * (180 / Math.PI);
}

function degToRad(convert) {
    return convert * (Math.PI / 180);
}

function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

function draw2D(gl, positions, count, prim) {
    // Get the strings for our GLSL shader.
        var vertexShaderSource = " attribute vec4 a_position; void main() { gl_Position = a_position; }";
        var fragmentShaderSource = "void main() { gl_FragColor = vec4(1, 0, 0.5, 1); }";

        // create GLSL shaders, upload the GLSL source, compile the shaders
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
        var array = new Float32Array(positions);

        // Link the two shaders into a program
        var program = createProgram(gl, vertexShader, fragmentShader);

        // look up where the vertex data needs to go.
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

        // Create a buffer and put three 2d clip space points in it
        var positionBuffer = gl.createBuffer();

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);

        // code above this line is initialization code.
        // code below this line is rendering code.

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        // Clear the canvas
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        // Tell it to use our program (pair of shaders)
        gl.useProgram(program);

        // Turn on the attribute
        gl.enableVertexAttribArray(positionAttributeLocation);

        // Bind the position buffer.
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
        var size = 2;          // 2 components per iteration
        var type = gl.FLOAT;   // the data is 32bit floats
        var normalize = false; // don't normalize the data
        var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        var offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
          positionAttributeLocation, size, type, normalize, stride, offset)

        // draw
        var primitiveType = gl.LINES;
        if(prim == "shape") {
            primitiveType = gl.TRIANGLE_STRIP;
        }
        var offset = 0;
        gl.drawArrays(primitiveType, offset, count);
}

function draw3D(gl, positions, count, prim) {
    var vertexShaderSource = " attribute vec4 a_position; uniform mat4 u_matrix; void main(){ gl_Position = u_matrix * a_position; }";
    var fragmentShaderSource = "precision mediump float; uniform vec4 u_color; void main(){ gl_FragColor = vec4(1, 0, 0.5, 1); }";

    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var array = new Float32Array(positions);

    // Link the two shaders into a program
    var program = createProgram(gl, vertexShader, fragmentShader);

    // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");

    // Create a buffer and put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);

    // code above this line is initialization code.
    // code below this line is rendering code.

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Clear the canvas
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3;          // 2 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

    // draw
    var primitiveType = gl.LINES;
    if(prim == "shape") {
        primitiveType = gl.TRIANGLE_STRIP;
    }
    offset = 0;
    gl.drawArrays(primitiveType, offset, count);
}

window.onload = function() {
  // Get A WebGL context
    var front = document.getElementById("frontCanvas");
    var frontGL = front.getContext("webgl");
    if (!frontGL) {
        return;
    }
    
    var top = document.getElementById("topCanvas");
    var topGL = top.getContext("webgl");
    if (!topGL) {
        return;
    }
    
    var side = document.getElementById("sideCanvas");
    var sideGL = side.getContext("webgl");
    if (!sideGL) {
        return;
    }
    
    var master = document.getElementById("masterCanvas");
    var masterGL = master.getContext("webgl");
    if (!masterGL) {
        return;
    }
    
    var frontA = new Array(); var frontSize = 0;
    var sideA = new Array(); var sideSize = 0;
    var topA = new Array(); var topSize = 0;
//   var vLayer = 0;
//    var radius = 200;
//    var XZRotation = radToDeg(0);
//    var YZRotation = radToDeg(0);

    document.getElementById("frontCanvas").addEventListener("click", function(evt) {
        var mousePosition = getMousePosition(front, evt);
        var newX = mousePosition.x / front.width * 2 - 1;
        var newY = -(mousePosition.y / front.height * 2 - 1);
        var shape;

        frontA.push(newX);
        frontA.push(newY);
        
        frontSize++;
        if(frontSize <= 2) {
            shape = "points";
            draw2D(frontGL, frontA, frontSize, shape);
        } else {
            shape = "shape";
            draw2D(frontGL, frontA, frontSize, shape);
        }

        //Add each instance of newX and newY to the positions array in order to generate the shape.

        //The goal of this program atm is JUST to gather vertex
        //coordinates. If you can set up an effective means of
        //gathering said 3d coordinates, you can generate a 3d
        //object from it.        
    });
    document.getElementById("sideCanvas").addEventListener("click", function(evt) {
        var mousePosition = getMousePosition(side, evt);
        var newX = mousePosition.x / side.width * 2 - 1;
        var newY = -(mousePosition.y / side.height * 2 - 1);
        var shape;

        sideA.push(newX);
        sideA.push(newY);
        
        sideSize++;
        
        if(sideSize <= 2) {
            shape = "points";
            draw2D(sideGL, sideA, sideSize, shape);
        } else {
            shape = "shape";
            draw2D(sideGL, sideA, sideSize, shape);
        }

        //Add each instance of newX and newY to the positions array in order to generate the shape.

        //The goal of this program atm is JUST to gather vertex
        //coordinates. If you can set up an effective means of
        //gathering said 3d coordinates, you can generate a 3d
        //object from it.        
    });
    document.getElementById("topCanvas").addEventListener("click", function(evt) {
        var mousePosition = getMousePosition(top, evt);
        var newX = mousePosition.x / top.width * 2 - 1;
        var newY = -(mousePosition.y / top.height * 2 - 1);
        var shape;

        topA.push(newX);
        topA.push(newY);
        
        topSize++;
        
        if(topSize <= 2) {
            shape = "line";
            draw2D(topGL, topA, topSize, shape);
        } else {
            shape = "shape";
            draw2D(topGL, topA, topSize, shape);
        }

        //Add each instance of newX and newY to the positions array in order to generate the shape.

        //The goal of this program atm is JUST to gather vertex
        //coordinates. If you can set up an effective means of
        //gathering said 3d coordinates, you can generate a 3d
        //object from it.        
    });
    document.getElementById("transform").addEventListener("click", function(evt) {
        toggleCanvas();
        var newX, newY, newZ;
        var shape;
        var counter = 0;
        var master3D = new Array(); var masterSize = 0;
        if(frontSize > 0) {
            counter = frontSize;
            while(counter > 0) {
                newX = frontA.shift(); 
                newY = frontA.shift(); 
                newZ = 1.0;
                
                console.log("NewX: "+ newX + " NewY: " + newY + " NewZ: " + newZ);

                master3D.push(newX);
                master3D.push(newY);
                master3D.push(newZ);
                masterSize++;
                frontSize--;
                counter--;
            }
        }
        if(sideSize > 0) {
            counter = sideSize;
            while(counter > 0) {
                newZ = sideA.shift(); 
                newY = sideA.shift(); 
                newX = 1.0;
                
                console.log("NewX: "+ newX + " NewY: " + newY + " NewZ: " + newZ);

                master3D.push(newX);
                master3D.push(newY);
                master3D.push(newZ);
                masterSize++;
                sideSize--;
                counter--;
            }
        }
        if(topSize > 0) {
            counter = topSize;
            while(counter > 0) {
                newX = topA.shift(); 
                newZ = topA.shift(); 
                newY = 1.0;
                
                console.log("NewX: "+ newX + " NewY: " + newY + " NewZ: " + newZ);

                master3D.push(newX);
                master3D.push(newY);
                master3D.push(newZ);
                masterSize++;
                topSize--;
                counter--;
            }
        }
        if(masterSize > 0) {
            //Use the points gathered in masterSize to create a 3D image with three sides drawn using Triangle_Strip.
            if(masterSize <= 2) {
                shape = "line";
                draw3D(masterGL, master3D, masterSize, shape);
            } else {
                shape = "shape";
                draw3D(masterGL, master3D, masterSize, shape);
            }
        }
    });
}
