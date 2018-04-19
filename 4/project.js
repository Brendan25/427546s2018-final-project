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

//** BEGIN Code taken from WebGLFundamentals tutorials on performing transformations in 3D. ***
//Multiplies the translation, rotation, and scale matrices of the 3D object and a change matrix together in order to apply a change.
function multiply(orig, change) {
    var orig00 = orig[0 * 4 + 0];
    var orig01 = orig[0 * 4 + 1];
    var orig02 = orig[0 * 4 + 2];
    var orig03 = orig[0 * 4 + 3];
    var orig10 = orig[1 * 4 + 0];
    var orig11 = orig[1 * 4 + 1];
    var orig12 = orig[1 * 4 + 2];
    var orig13 = orig[1 * 4 + 3];
    var orig20 = orig[2 * 4 + 0];
    var orig21 = orig[2 * 4 + 1];
    var orig22 = orig[2 * 4 + 2];
    var orig23 = orig[2 * 4 + 3];
    var orig30 = orig[3 * 4 + 0];
    var orig31 = orig[3 * 4 + 1];
    var orig32 = orig[3 * 4 + 2];
    var orig33 = orig[3 * 4 + 3];
    var change00 = change[0 * 4 + 0];
    var change01 = change[0 * 4 + 1];
    var change02 = change[0 * 4 + 2];
    var change03 = change[0 * 4 + 3];
    var change10 = change[1 * 4 + 0];
    var change11 = change[1 * 4 + 1];
    var change12 = change[1 * 4 + 2];
    var change13 = change[1 * 4 + 3];
    var change20 = change[2 * 4 + 0];
    var change21 = change[2 * 4 + 1];
    var change22 = change[2 * 4 + 2];
    var change23 = change[2 * 4 + 3];
    var change30 = change[3 * 4 + 0];
    var change31 = change[3 * 4 + 1];
    var change32 = change[3 * 4 + 2];
    var change33 = change[3 * 4 + 3];
    return [
      change00 * orig00 + change01 * orig10 + change02 * orig20 + change03 * orig30,
      change00 * orig01 + change01 * orig11 + change02 * orig21 + change03 * orig31,
      change00 * orig02 + change01 * orig12 + change02 * orig22 + change03 * orig32,
      change00 * orig03 + change01 * orig13 + change02 * orig23 + change03 * orig33,
      change10 * orig00 + change11 * orig10 + change12 * orig20 + change13 * orig30,
      change10 * orig01 + change11 * orig11 + change12 * orig21 + change13 * orig31,
      change10 * orig02 + change11 * orig12 + change12 * orig22 + change13 * orig32,
      change10 * orig03 + change11 * orig13 + change12 * orig23 + change13 * orig33,
      change20 * orig00 + change21 * orig10 + change22 * orig20 + change23 * orig30,
      change20 * orig01 + change21 * orig11 + change22 * orig21 + change23 * orig31,
      change20 * orig02 + change21 * orig12 + change22 * orig22 + change23 * orig32,
      change20 * orig03 + change21 * orig13 + change22 * orig23 + change23 * orig33,
      change30 * orig00 + change31 * orig10 + change32 * orig20 + change33 * orig30,
      change30 * orig01 + change31 * orig11 + change32 * orig21 + change33 * orig31,
      change30 * orig02 + change31 * orig12 + change32 * orig22 + change33 * orig32,
      change30 * orig03 + change31 * orig13 + change32 * orig23 + change33 * orig33,
    ];
}

function projection(width, height, depth) {
    var return_val = new Array();
    return_val = [(2 / width), 0, 0, 0,
            0, (-2 / height), 0, 0,
            0, 0, (2 / depth), 0,
            -1, 1, 0, 1];
    return return_val;
}

function tr(translate) {
    var return_val = new Array();
    return [
       1,  0,  0,  0,
       0,  1,  0,  0,
       0,  0,  1,  0,
       translate[0], translate[1], translate[2], 1,
    ];
}

function xRot(masterAngle) {
    return [
       1,  0,  0,  0,
       0,  Math.cos(masterAngle[0]),  Math.sin(masterAngle[0]),  0,
       0,  -Math.sin(masterAngle[0]),  Math.cos(masterAngle[0]),  0,
       0,  0,  0,  1,
    ];
}

function yRot(masterAngle) {
    return [
        Math.cos(masterAngle[1]),  0,  -Math.sin(masterAngle[1]),  0,
       0, 1,  0,  0,
       Math.sin(masterAngle[1]),  0,  Math.cos(masterAngle[1]),  0,
       0,  0,  0,  1,
    ];
}

function zRot(masterAngle) {
    return [
       Math.cos(masterAngle[2]),   Math.sin(masterAngle[2]),  0,  0,
       -Math.sin(masterAngle[2]),  Math.cos(masterAngle[2]), 0,  0,
       0,  0,  1,  0,
       0,  0,  0,  1,
    ];
}

function rS(scale) {
    return [
      scale[0], 0,  0,  0,
      0, scale[1],  0,  0,
      0,  0, scale[2],  0,
      0,  0,  0,  1,
    ];
}

function translate(matrix, translate) {
    return multiply(matrix, tr(translate));
}

function xRotate(matrix, masterAngle) {
    return multiply(matrix, xRot(masterAngle));
}

function yRotate(matrix, masterAngle) {
    return multiply(matrix, yRot(masterAngle));
}

function zRotate(matrix, masterAngle) {
    return multiply(matrix, zRot(masterAngle));
}

function reScale(matrix, scale) {
    return multiply(matrix, rS(scale));
}

//*** END Code taken verbatim from WEBGL Fundamentals. 
//*** BEGIN Code modified from code found on WEBGL Fundamentals

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

function draw2D(gl, positions, count, prim, color) {
    // Get the strings for our GLSL shader.
        var vertexShaderSource = " attribute vec4 a_position; void main() { gl_Position = a_position; }";
        var fragmentShaderSource = "precision mediump float; uniform vec4 u_color; void main() {  gl_FragColor = u_color; }";

        // create GLSL shaders, upload the GLSL source, compile the shaders
        var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
        var array = new Float32Array(positions);

        // Link the two shaders into a program
        var program = createProgram(gl, vertexShader, fragmentShader);

        // look up where the vertex data needs to go.
        var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    
        var colorLocation = gl.getUniformLocation(program, "u_color");
    
        //var translationLocation = gl.getUniformLocation(program, "u_translation");

        // Create a buffer and put three 2d clip space points in it
        var positionBuffer = gl.createBuffer();

        // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);

        // code above this line is initialization code.
        // code below this line is rendering code.

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

        //*** Clear the canvas
        //gl.clearColor(0, 0, 0, 0);
        //gl.clear(gl.COLOR_BUFFER_BIT);

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
        var primitiveType = gl.POINTS;
        if(prim == "LINES") {
            primitiveType = gl.LINES;
        } else if(prim == "LINE_STRIP") {
            primitiveType = gl.LINE_STRIP;
        } else if(prim == "TRIANGLE") {
            primitiveType = gl.TRIANGLES;
        } else if(prim == "TRIANGLE_FAN") {
            primitiveType = gl.TRIANGLE_FAN;
        } else if(prim == "TRIANGLE_STRIP") {
            primitiveType = gl.TRIANGLE_STRIP;
        }
    
        gl.uniform4fv(colorLocation, color);
        gl.drawArrays(primitiveType, offset, count);
}

function draw3D(gl, positions, count, prim, color, translation, angle, scale) {
    var vertexShaderSource = "attribute vec4 a_position; uniform mat4 u_matrix; void main() { gl_Position = u_matrix * a_position;}";
    var fragmentShaderSource = "precision mediump float; uniform vec4 u_color; void main() {  gl_FragColor = u_color; }";

    // create GLSL shaders, upload the GLSL source, compile the shaders
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

    var array = new Float32Array(positions);

    // Link the two shaders into a program
    var program = createProgram(gl, vertexShader, fragmentShader);

    // look up where the vertex data needs to go.
    var positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    
    var colorLocation = gl.getUniformLocation(program, "u_color");
        
    var matrixLocation = gl.getUniformLocation(program, "u_matrix");

    // Create a buffer and put three 2d clip space points in it
    var positionBuffer = gl.createBuffer();

    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);

    // code above this line is initialization code.
    // code below this line is rendering code.

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the attribute
    gl.enableVertexAttribArray(positionAttributeLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3;          // 3 components per iteration
    var type = gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0;        // start at the beginning of the buffer
    gl.vertexAttribPointer(
      positionAttributeLocation, size, type, normalize, stride, offset)

    // draw
    var primitiveType = gl.POINTS;
    if(prim == "LINES") {
        primitiveType = gl.LINES;
    } else if(prim == "LINE_STRIP") {
        primitiveType = gl.LINE_STRIP;
    } else if(prim == "TRIANGLE") {
        primitiveType = gl.TRIANGLES;
    } else if(prim == "TRIANGLE_FAN") {
        primitiveType = gl.TRIANGLE_FAN;
    } else if(prim == "TRIANGLE_STRIP") {
        primitiveType = gl.TRIANGLE_STRIP;
    }
    
    gl.uniform4fv(colorLocation, color);
    
    var matrix = new Array();
    matrix = projection(gl.canvas.clientWidth, gl.canvas.clientHeight, 600);
    matrix = translate(matrix, translation);
    matrix = xRotate(matrix, angle);
    matrix = yRotate(matrix, angle);
    matrix = zRotate(matrix, angle);
    matrix = reScale(matrix, scale);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);
    
    //gl.uniform3fv(translationLocation, translation);
    gl.drawArrays(primitiveType, offset, count);
}
// *** END Code modified from code found on WEBGL Fundamentals


// *** BEGIN ORIGINAL CODE

function drawMaster(gl, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale) {
    var coordinate_num;
    var i = 0;
    var color;
    var coordinate_num;
    var shape;
    
    if(master3D.length > 0) {
        //Use the points gathered in masterSize to create a 3D image with three sides drawn using Triangle_Strip.
        while(i < master3D.length) {
            if(master3D[i].length > 0) {
                coordinate_num = (master3D[i].length / 3);
                if(masterTypes[i] == "line") {
                    shape = "LINES";
                } else if(masterTypes[i] == "polyline") {
                    shape = "LINE_STRIP";
                } else if(masterTypes[i] == "circle") {
                    shape = "TRIANGLE_FAN";
                } else if(masterTypes[i] == "triangle") {
                    shape = "TRIANGLE";
                } else if(masterTypes[i] == "rectangle") {
                    shape = "TRIANGLE_FAN";
                } else if(masterTypes[i] == "polygon") {
                    shape = "TRIANGLE_STRIP";
                } else if(masterTypes[i] == "triangle_fan") {
                    shape = "TRIANGLE_FAN";
                }

                if(masterColor[i] == "black") {
                    color = [0.0, 0.0, 0.0, 1.0];
                } else if(masterColor[i] == "red") {
                    color = [1.0, 0.0, 0.0, 1.0];
                } else if(masterColor[i] == "blue") {
                    color = [0.0, 0.0, 1.0, 1.0];
                } else if(masterColor[i] == "green") {
                    color = [0.0, 1.0, 0.0, 1.0];
                } else if(masterColor[i] == "yellow") {
                    color = [1.0, 1.0, 0.0, 1.0];
                } else if(masterColor[i] == "pink") {
                    color = [1.0, 0.0, 1.0, 1.0];
                } else if(masterColor[i] == "purple") {
                    color = [0.4, 0.0, 0.4, 1.0];
                } else if(masterColor[i] == "brown") {
                    color = [0.4, 0.2, 0.0, 1.0];
                }
                draw3D(gl, master3D[i], ((master3D[i].length) / 3), shape, color, masterTranslation, masterAngle, masterScale);
            }
            i++;
        }
    }
}

//House Object definition

var house = new Array();
var houseTypes = new Array();
var houseColor = new Array();
//Roof Shapes
//back-edge

house[0] = [0.2, 0.4, 0.5, 0, 0.3, 0.6, 0.4, 0.3, 0.6]; // Set
houseTypes[0] = "triangle";
houseColor[0] = "brown";
//front-edge
house[1] = [0.2, 0.4, 0.3, 0, 0.3, 0.2, 0.4, 0.3, 0.2]; //Set
houseTypes[1] = "triangle";
houseColor[1] = "brown";
//
house[2] = [0, 0.3, 0.2, 0.2, 0.4, 0.3, 0.2, 0.4, 0.4, 0, 0.3, 0.4]; //Set
houseTypes[2] = "triangle_fan";
houseColor[2] = "brown";
house[3] = [0, 0.3, 0.6, 0.2, 0.4, 0.5, 0.2, 0.4, 0.4, 0, 0.3, 0.4]; //Set
houseTypes[3] = "triangle_fan";
houseColor[3] = "brown";
house[4] = [0.4, 0.3, 0.6, 0.2, 0.4, 0.5, 0.2, 0.4, 0.4, 0.4, 0.3, 0.4];// Set
houseTypes[4] = "triangle_fan";
houseColor[4] = "brown";
house[5] = [0.4, 0.3, 0.2, 0.2, 0.4, 0.3, 0.2, 0.4, 0.4, 0.4, 0.3, 0.4]; //Set
houseTypes[5] = "triangle_fan";
houseColor[5] = "brown";

//Side Shapes
//Left
house[6] = [0, 0.3, 0.6, 0, 0, 0.6, 0, 0, 0.2, 0, 0.3, 0.2]; //Set
houseTypes[6] = "triangle_fan";
houseColor[6] = "green";
//Right
house[7] = [0.4, 0.3, 0.6, 0.4, 0, 0.6, 0.4, 0, 0.2, 0.4, 0.3, 0.2]; //Set
houseTypes[7] = "triangle_fan";
houseColor[7] = "blue";
//Back
house[8] = [0, 0.3, 0.2, 0.4, 0.3, 0.2, 0.4, 0, 0.2, 0, 0, 0.2]; //Set
houseTypes[8] = "triangle_fan";
houseColor[8] = "red";

//Front Shapes
house[9] = [0, 0.3, 0.6, 0.4, 0.3, 0.6, 0.4, 0, 0.6, 0, 0, 0.6]; //Set
houseTypes[9] = "triangle_fan";
houseColor[9] = "purple";


window.onload = function() {
  // Get A WebGL context
    
    var master = document.getElementById("masterCanvas");
    var masterGL = master.getContext("webgl", {preserveDrawingBuffer: true});
    if(!masterGL) {
        return;
    }
    
    var master3D = new Array();
    
    //f = number of shapes on frontA. i = number of entries in each layer.
    
    var masterTranslation = [300, 300, 0];
    var masterAngle = [0, 0, 0];
    var masterScale = [1, 1, 1];
    
    //Set up a loop that moves every point in house to master3D whilst making the canvas conversion.
    
    var i = 0; var j = 0;
    
    var num_of_shapes = house.length;
    
    while(i < num_of_shapes) {
        var coorCount = house[i].length / 3;
        master3D[i] = new Array();
        j = 0;
        while(j < coorCount) {
            var xHold = house[i][0 + (3 * j)];
            var yHold = house[i][1 + (3 * j)];
            var zHold = house[i][2 + (3 * j)];
            newX = ((xHold) * master.width);
            newY = ((-yHold) * master.height);
            newZ = ((zHold) * master.width);

            master3D[i].push(newX);
            master3D[i].push(newY);
            master3D[i].push(newZ);
            j++;
        }
        i++;
    }
    
    
    drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
    
    
    document.getElementById("x").addEventListener("change", function(evt) {
        masterTranslation[0] = parseFloat(document.getElementById("x").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("xVal").innerHTML = document.getElementById("x").value;
    });
    document.getElementById("y").addEventListener("change", function(evt) {
        masterTranslation[1] = parseFloat(document.getElementById("y").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("yVal").innerHTML = document.getElementById("y").value;
    });
    document.getElementById("z").addEventListener("change", function(evt) {
        masterTranslation[2] = parseFloat(document.getElementById("z").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("zVal").innerHTML = document.getElementById("z").value;
    });
    document.getElementById("angleX").addEventListener("change", function(evt) {
        var temp = parseFloat(document.getElementById("angleX").value);
        masterAngle[0] = temp * (Math.PI / 180);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("angleXVal").innerHTML = document.getElementById("angleX").value;
    });
    document.getElementById("angleY").addEventListener("change", function(evt) {
        var temp = parseFloat(document.getElementById("angleY").value);
        masterAngle[1] = temp * (Math.PI / 180);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("angleYVal").innerHTML = document.getElementById("angleY").value;
    });
    document.getElementById("angleZ").addEventListener("change", function(evt) {
        var temp = parseFloat(document.getElementById("angleZ").value);
        masterAngle[2] = temp * (Math.PI / 180);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("angleZVal").innerHTML = document.getElementById("angleZ").value;
    });
    document.getElementById("scaleX").addEventListener("change", function(evt) {
        masterScale[0] = parseFloat(document.getElementById("scaleX").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("scaleXVal").innerHTML = document.getElementById("scaleX").value;
    });
    document.getElementById("scaleY").addEventListener("change", function(evt) {
        masterScale[1] = parseFloat(document.getElementById("scaleY").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("scaleYVal").innerHTML = document.getElementById("scaleY").value;
    });
    document.getElementById("scaleZ").addEventListener("change", function(evt) {
        masterScale[2] = parseFloat(document.getElementById("scaleZ").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(masterGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, houseTypes, houseColor, masterTranslation, masterAngle, masterScale);
        
        document.getElementById("scaleZVal").innerHTML = document.getElementById("scaleZ").value;
    });
}
// *** END Original Code
