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

// *** BEGIN getMousePosition code taken from html5CanvasTutorials.com
function getMousePosition(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    var varX = (evt.clientX - rect.left);
    var varY = (evt.clientY - rect.top);
    return{
        x: varX,
        y: varY
    };
}
// *** END

// *** BEGIN ORIGINAL CODE

function toggleCanvas() {
    document.getElementById("front").style.display = "none";
    document.getElementById("side").style.display = "none";
    document.getElementById("top").style.display = "none";
    document.getElementById("master").style.display = "block";
    document.getElementById("transform").style.display = "none";
}

function toggleCanvas2() {
    document.getElementById("front").style.display = "block";
    document.getElementById("side").style.display = "block";
    document.getElementById("top").style.display = "block";
    document.getElementById("master").style.display = "none";
    document.getElementById("transform").style.display = "block";
}

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
                }

                if(masterColor[i] == "black") {
                    color = [0.0, 0.0, 0.0, 1.0];
                } else if(masterColor[i] == "red") {
                    color = [1.0, 0.0, 0.0, 1.0];
                } else if(masterColor[i] == "blue") {
                    color = [0.0, 1.0, 0.0, 1.0];
                } else if(masterColor[i] == "green") {
                    color = [0.0, 0.0, 1.0, 1.0];
                } else if(masterColor[i] == "yellow") {
                    color = [1.0, 1.0, 0.0, 1.0];
                } else if(masterColor[i] == "pink") {
                    color = [1.0, 0.0, 0.25, 1.0];
                } else if(masterColor[i] == "purple") {
                    color = [1.0, 0.0, 1.0, 1.0];
                } else if(masterColor[i] == "brown") {
                    color = [1.0, 1.0, 1.0, 1.0];
                }
                draw3D(gl, master3D[i], ((master3D[i].length) / 3), shape, color, masterTranslation, masterAngle, masterScale);
            }
            i++;
        }
    }
}

window.onload = function() {
  // Get A WebGL context
    var front = document.getElementById("frontCanvas");
    var frontGL = front.getContext("webgl", {preserveDrawingBuffer: true});
    if (!frontGL) {
        return;
    }
    
    var top = document.getElementById("topCanvas");
    var topGL = top.getContext("webgl", {preserveDrawingBuffer: true});
    if (!topGL) {
        return;
    }
    
    var side = document.getElementById("sideCanvas");
    var sideGL = side.getContext("webgl", {preserveDrawingBuffer: true});
    if (!sideGL) {
        return;
    }
    
    var master;
    var masterGL;
    
    //f = number of shapes on frontA. i = number of entries in each layer.
    var frontA = new Array();
    var frontTypes = new Array();
    var frontColor = new Array();
    var f = 0;
    frontA[f] = new Array(); 
    frontTypes.push("line");
    frontColor.push("black");
    
    var sideA = new Array(); 
    var s = 0;
    var sideTypes = new Array();
    var sideColor = new Array();
    sideA[s] = new Array(); 
    sideTypes.push("line");
    sideColor.push("black");
    
    var topA = new Array(); 
    var t = 0;
    var topTypes = new Array();
    var topColor = new Array();
    topA[t] = new Array(); 
    topTypes.push("line");
    topColor.push("black");
    
    var master3D = new Array(); var masterSize = 0; 
    var masterTypes = new Array();
    var masterColor = new Array();
    var masterTranslation = [0, 0, 0];
    var masterAngle = [0, 0, 0];
    var masterScale = [1, 1, 1];
    
    //var shape_typeF = "line";
    //var shape_typeS = "line";
    //var shape_typeT = "line";
    
//   var vLayer = 0;
//    var radius = 200;
//    var XZRotation = radToDeg(0);
//    var YZRotation = radToDeg(0);

//Constructors for each new shape on the Front Portion.
    document.getElementById("frontLine").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("line");
        frontColor.push(document.getElementById("frontColor").value);
    });
    document.getElementById("frontPolyline").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("polyline");
        frontColor.push(document.getElementById("frontColor").value);
    });
    document.getElementById("frontCircle").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("circle");
        frontColor.push(document.getElementById("frontColor").value);
    });
    document.getElementById("frontTriangle").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("triangle");
        frontColor.push(document.getElementById("frontColor").value);
    });
    document.getElementById("frontRectangle").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("rectangle");
        frontColor.push(document.getElementById("frontColor").value);
    });
    document.getElementById("frontPolygon").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("polygon");
        frontColor.push(document.getElementById("frontColor").value);
    });
    document.getElementById("frontColor").addEventListener("change", function(evt) {
        frontColor.pop();
        frontColor.push(document.getElementById("frontColor").value);
    });

//Constructors for each new shape on the Side Portion.
    document.getElementById("sideLine").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("line");
        sideColor.push(document.getElementById("sideColor").value);
    });
    document.getElementById("sidePolyline").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("polyline");
        sideColor.push(document.getElementById("sideColor").value);
    });
    document.getElementById("sideCircle").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("circle");
        sideColor.push(document.getElementById("sideColor").value);
    });
    document.getElementById("sideTriangle").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("triangle");
        sideColor.push(document.getElementById("sideColor").value);
    }); 
    document.getElementById("sideRectangle").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("rectangle");
        sideColor.push(document.getElementById("sideColor").value);
    });
    document.getElementById("sidePolygon").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("polygon");
        sideColor.push(document.getElementById("sideColor").value);
    });
    document.getElementById("sideColor").addEventListener("change", function(evt) {
        sideColor.pop();
        sideColor.push(document.getElementById("sideColor").value);
    });

//Constructors for each new shape on the Top Portion.
    document.getElementById("topLine").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("line");
        topColor.push(document.getElementById("topColor").value);
    });
    document.getElementById("topPolyline").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("polyline");
        topColor.push(document.getElementById("topColor").value);
    });
    document.getElementById("topCircle").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("circle");
        topColor.push(document.getElementById("topColor").value);
    });
    document.getElementById("topTriangle").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("triangle");
        topColor.push(document.getElementById("topColor").value);
    });  
    document.getElementById("topRectangle").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("rectangle");
        topColor.push(document.getElementById("topColor").value);
    });
    document.getElementById("topPolygon").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("polygon");
        topColor.push(document.getElementById("topColor").value);
    });
    document.getElementById("topColor").addEventListener("change", function(evt) {
        topColor.pop();
        topColor.push(document.getElementById("topColor").value);
    });

//Canvas Listeners that draw the given objects on click by user.
    document.getElementById("frontCanvas").addEventListener("click", function(evt) {
        var mousePosition = getMousePosition(front, evt);
        var newX = mousePosition.x / front.width * 2 - 1;
        var newY = -(mousePosition.y / front.height * 2 - 1);
        var shape;
        var counter = 0;
        var color;
        
        var rad = 300 + (10 * parseInt(document.getElementById("frontRadius").value));
        var radius = (rad / 600) * 2 - 1;
        
        if(frontTypes[f] == "circle") {
            for (var i = 0; i <= 200; i++){
                frontA[f].push(newX + radius*Math.cos(i*2*Math.PI/200));
                frontA[f].push(newY + radius*Math.sin(i*2*Math.PI/200));
            } 
            f++;
            frontA[f] = new Array();
            frontTypes.push("circle");
            frontColor.push(document.getElementById("frontColor").value);
        } else if(frontTypes[f] == "rectangle") {
            if(frontA[f][0] == null) {
                frontA[f].push(newX);
                frontA[f].push(newY);
            } else {
                frontA[f].push(newX);
                frontA[f].push(frontA[f][1]);
                frontA[f].push(newX);
                frontA[f].push(newY);
                frontA[f].push(frontA[f][0]);
                frontA[f].push(newY);
                
                f++;
                frontA[f] = new Array();
                frontTypes.push("rectangle");
                frontColor.push(document.getElementById("frontColor").value);
            }
        } else {
            frontA[f].push(newX);
            frontA[f].push(newY);
        }
        
        //While there are still undrawn shapes stored in frontA...
        frontGL.clearColor(0, 0, 0, 0);
        frontGL.clear(frontGL.COLOR_BUFFER_BIT);
        while(counter < frontA.length) {
            //Default to drawing points
            if(frontA[counter].length > 0) {
                if(frontA[counter].length == 2) {
                    shape = "POINTS";
                } else if(frontTypes[counter] == "line") {
                    shape = "LINES";
                } else if(frontTypes[counter] == "polyline") {
                    shape = "LINE_STRIP";
                } else if(frontTypes[counter] == "circle") {
                    shape = "TRIANGLE_FAN";
                } else if(frontTypes[counter] == "triangle") {
                    shape = "TRIANGLE";
                } else if(frontTypes[counter] == "rectangle") {
                    shape = "TRIANGLE_FAN";
                } else if(frontTypes[counter] == "polygon") {
                    shape = "TRIANGLE_STRIP";
                }
                
                if(frontColor[counter] == "black") {
                    color = [0.0, 0.0, 0.0, 1.0];
                } else if(frontColor[counter] == "red") {
                    color = [1.0, 0.0, 0.0, 1.0];
                } else if(frontColor[counter] == "blue") {
                    color = [0.0, 0.0, 1.0, 1.0];
                } else if(frontColor[counter] == "green") {
                    color = [0.0, 1.0, 0.0, 1.0];
                } else if(frontColor[counter] == "yellow") {
                    color = [1.0, 1.0, 0.0, 1.0];
                } else if(frontColor[counter] == "pink") {
                    color = [1.0, 0.0, 1.0, 1.0];
                } else if(frontColor[counter] == "purple") {
                    color = [0.4, 0.0, 0.4, 1.0];
                } else if(frontColor[counter] == "brown") {
                    color = [0.4, 0.2, 0.0, 1.0];
                }
                draw2D(frontGL, frontA[counter], ((frontA[counter].length) / 2), shape, color);
            }
            counter++;
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
        var counter = 0;
        var color;
        
        var rad = 300 + (10 * parseInt(document.getElementById("sideRadius").value));
        var radius = (rad / 600) * 2 - 1;
        
        if(sideTypes[s] == "circle") {
            for (var i = 0; i <= 200; i++){
                sideA[s].push(newX + radius*Math.cos(i*2*Math.PI/200));
                sideA[s].push(newY + radius*Math.sin(i*2*Math.PI/200));
            } 
            s++;
            sideA[s] = new Array();
            sideTypes.push("circle");
            sideColor.push(document.getElementById("sideColor").value);
        } else if(sideTypes[s] == "rectangle") {
            if(sideA[s][0] == null) {
                sideA[s].push(newX);
                sideA[s].push(newY);
            } else {
                sideA[s].push(newX);
                sideA[s].push(sideA[s][1]);
                sideA[s].push(newX);
                sideA[s].push(newY);
                sideA[s].push(sideA[s][0]);
                sideA[s].push(newY);
                
                s++;
                sideA[s] = new Array();
                sideTypes.push("rectangle");
                sideColor.push(document.getElementById("sideColor").value);
            }
        } else {
            sideA[s].push(newX);
            sideA[s].push(newY);
        }
        
        //While there are still undrawn shapes stored in sideA...
        sideGL.clearColor(0, 0, 0, 0);
        sideGL.clear(sideGL.COLOR_BUFFER_BIT);
        while(counter < sideA.length) {
            //Default to drawing points
            if(sideA[counter].length > 0) {
                if(sideA[counter].length == 2) {
                    shape = "POINTS";
                } else if(sideTypes[counter] == "line") {
                    shape = "LINES";
                } else if(sideTypes[counter] == "polyline") {
                    shape = "LINE_STRIP";
                } else if(sideTypes[counter] == "circle") {
                    shape = "TRIANGLE_FAN";
                } else if(sideTypes[counter] == "triangle") {
                    shape = "TRIANGLE";
                } else if(sideTypes[counter] == "rectangle") {
                    shape = "TRIANGLE_FAN";
                } else if(sideTypes[counter] == "polygon") {
                    shape = "TRIANGLE_STRIP";
                }
                
                if(sideColor[counter] == "black") {
                    color = [0.0, 0.0, 0.0, 1.0];
                } else if(sideColor[counter] == "red") {
                    color = [1.0, 0.0, 0.0, 1.0];
                } else if(sideColor[counter] == "blue") {
                    color = [0.0, 0.0, 1.0, 1.0];
                } else if(sideColor[counter] == "green") {
                    color = [0.0, 1.0, 0.0, 1.0];
                } else if(sideColor[counter] == "yellow") {
                    color = [1.0, 1.0, 0.0, 1.0];
                } else if(sideColor[counter] == "pink") {
                    color = [1.0, 0.0, 1.0, 1.0];
                } else if(sideColor[counter] == "purple") {
                    color = [0.4, 0.0, 0.4, 1.0];
                } else if(sideColor[counter] == "brown") {
                    color = [0.4, 0.2, 0.0, 1.0];
                }
                draw2D(sideGL, sideA[counter], ((sideA[counter].length) / 2), shape, color);
            }
            counter++;
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
        var counter = 0;
        
        var rad = 300 + (10 * parseInt(document.getElementById("topRadius").value));
        var radius = (rad / 600) * 2 - 1;
        
        if(topTypes[t] == "circle") {
            for (var i = 0; i <= 200; i++){
                topA[t].push(newX + radius*Math.cos(i*2*Math.PI/200));
                topA[t].push(newY + radius*Math.sin(i*2*Math.PI/200));
            } 
            t++;
            topA[t] = new Array();
            topTypes.push("circle");
            topColor.push(document.getElementById("topColor").value);
        } else if(topTypes[t] == "rectangle") {
            if(topA[t][0] == null) {
                topA[t].push(newX);
                topA[t].push(newY);
            } else {
                topA[t].push(newX);
                topA[t].push(topA[t][1]);
                topA[t].push(newX);
                topA[t].push(newY);
                topA[t].push(topA[t][0]);
                topA[t].push(newY);
                
                t++;
                topA[t] = new Array();
                sideTypes.push("rectangle");
                sideColor.push(document.getElementById("topColor").value);
            }
        } else {
            topA[t].push(newX);
            topA[t].push(newY);
        }
        
        //While there are still undrawn shapes stored in topA...
        topGL.clearColor(0, 0, 0, 0);
        topGL.clear(topGL.COLOR_BUFFER_BIT);
        while(counter < topA.length) {
            //Default to drawing points
            if(topA[counter].length > 0) {
                if(topA[counter].length == 2) {
                    shape = "POINTS";
                } else if(topTypes[counter] == "line") {
                    shape = "LINES";
                } else if(topTypes[counter] == "polyline") {
                    shape = "LINE_STRIP";
                } else if(topTypes[counter] == "circle") {
                    shape = "TRIANGLE_FAN";
                    //More needed here.
                } else if(topTypes[counter] == "triangle") {
                    shape = "TRIANGLE";
                } else if(topTypes[counter] == "rectangle") {
                    shape = "TRIANGLE_FAN";
                    //More needed here
                } else if(topTypes[counter] == "polygon") {
                    spape = "TRIANGLE_STRIP";
                }
                
                if(topColor[counter] == "black") {
                    color = [0.0, 0.0, 0.0, 1.0];
                } else if(topColor[counter] == "red") {
                    color = [1.0, 0.0, 0.0, 1.0];
                } else if(topColor[counter] == "blue") {
                    color = [0.0, 0.0, 1.0, 1.0];
                } else if(topColor[counter] == "green") {
                    color = [0.0, 1.0, 0.0, 1.0];
                } else if(topColor[counter] == "yellow") {
                    color = [1.0, 1.0, 0.0, 1.0];
                } else if(topColor[counter] == "pink") {
                    color = [1.0, 0.0, 1.0, 1.0];
                } else if(topColor[counter] == "purple") {
                    color = [0.4, 0.0, 0.4, 1.0];
                } else if(topColor[counter] == "brown") {
                    color = [0.4, 0.2, 0.0, 1.0];
                }
                draw2D(topGL, topA[counter], ((topA[counter].length) / 2), shape, color);
            }
            counter++;
        }

        //Add each instance of newX and newY to the positions array in order to generate the shape.

        //The goal of this program atm is JUST to gather vertex
        //coordinates. If you can set up an effective means of
        //gathering said 3d coordinates, you can generate a 3d
        //object from it.        
    });

//Buttons that create the 3D object given by the above 3 canvases and reset for a new object respectively.
    document.getElementById("transform").addEventListener("click", function(evt) {
        toggleCanvas();
        var newX, newY, newZ;
        var shape;
        var i = 0; var j = 0;
        //Master3D defined on window load for the sake of later eventListeners.
        //MasterTypes defined onLoad to correct errors.
        //MasterColor also defined onLoad.
        var num_of_shapes = -1;
        var color;
        
        master = document.getElementById("masterCanvas");
        masterGL = master.getContext("webgl", {preserveDrawingBuffer: true});
        if (!masterGL) {
            return;
        }
        
        if(frontA.length > 0) {
            //If frontA has any shapes.
            var frontShapeCount = frontA.length;
            while(i < frontShapeCount){
                //While i is less than the number of SHAPES in front.
                num_of_shapes++;
                master3D[num_of_shapes] = new Array();
                
                masterTypes[num_of_shapes] = frontTypes[i];
                masterColor[num_of_shapes] = frontColor[i];
                var coorCount = frontA[i].length / 2;
                for(j = 0; j < (coorCount); j++) {
                    //While j is less than the number of coordinates in the current shape.
                    newX = (frontA[i].shift() + 1) / 2 * front.width;
                    newY = (-(frontA[i].shift()) + 1) / 2 * front.height;
                    newZ = 1.0;
                    
                    master3D[num_of_shapes].push(newX);
                    master3D[num_of_shapes].push(newY);
                    master3D[num_of_shapes].push(newZ);
                    
                }
                i++;
            }
            i = 0;
            j = 0;
        }
        if(sideA.length > 0) {
            //If sideA has any shapes.
            var sideShapeCount = sideA.length;
            while(i < sideShapeCount){
                //While i is less than the number of SHAPES in side.
                num_of_shapes++;
                master3D[num_of_shapes] = new Array();
                
                masterTypes[num_of_shapes] = sideTypes[i];
                masterColor[num_of_shapes] = frontColor[i];
                var coorCount = sideA[i].length / 2;
                for(j = 0; j < (coorCount); j++) {
                    //While j is less than the number of coordinates in the current shape.
                    newZ = (sideA[i].shift() + 1) / 2 * side.width;
                    newY = (-(sideA[i].shift()) + 1) / 2 * side.height;
                    newX = 1.0;
                    
                    master3D[num_of_shapes].push(newX);
                    master3D[num_of_shapes].push(newY);
                    master3D[num_of_shapes].push(newZ);
                }
                i++;
            }
            i = 0;
            j = 0;
        }
        if(topA.length > 0) {
            //If topA has any shapes.
            var topShapeCount = topA.length;
            while(i < topShapeCount){
                //While i is less than the number of SHAPES in top.
                num_of_shapes++;
                master3D[num_of_shapes] = new Array();
                
                masterTypes[num_of_shapes] = topTypes[i];
                masterColor[num_of_shapes] = frontColor[i];
                var coorCount = topA[i].length / 2;
                for(j = 0; j < (coorCount); j++) {
                    //While j is less than the number of coordinates in the current shape.
                    newX = (topA[i].shift() + 1) / 2 * top.width;
                    newZ = (-(topA[i].shift()) + 1) / 2 * top.height;
                    newY = 1.0;
                    
                    master3D[num_of_shapes].push(newX);
                    master3D[num_of_shapes].push(newY);
                    master3D[num_of_shapes].push(newZ);
                }
                i++;
            }
            i = 0;
            j = 0;
        }
        
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
              
    });
    document.getElementById("new").addEventListener("click", function(evt) {
        frontA = [];
        sideA = [];
        topA = [];
        f = 0; s = 0; t = 0;
        frontA[f] = new Array();
        sideA[s] = new Array();
        topA[t] = new Array();
        frontTypes = []; frontTypes[0] = "line";
        sideTypes = []; sideTypes[0] = "line";
        topTypes = []; topTypes[0] = "line";
        frontColor = []; frontColor[0] = "black";
        sideColor = []; sideColor[0] = "black";
        topColor = []; topColor[0] = "black";
        frontGL.clearColor(0, 0, 0, 0);
        frontGL.clear(frontGL.COLOR_BUFFER_BIT);
        sideGL.clearColor(0, 0, 0, 0);
        sideGL.clear(frontGL.COLOR_BUFFER_BIT);
        topGL.clearColor(0, 0, 0, 0);
        topGL.clear(frontGL.COLOR_BUFFER_BIT);
        toggleCanvas2();
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        master3D = [];
        masterTypes = []; 
        masterColor = [];
        masterTranslation = [0, 0, 0];
    });
    
    document.getElementById("x").addEventListener("change", function(evt) {
        masterTranslation[0] = parseFloat(document.getElementById("x").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
        document.getElementById("xVal").removeChild(document.getElementById("xVal").firstChild);
        document.getElementById("xVal").appendChild()
    });
    document.getElementById("y").addEventListener("change", function(evt) {
        masterTranslation[1] = parseFloat(document.getElementById("y").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
    });
    document.getElementById("z").addEventListener("change", function(evt) {
        masterTranslation[2] = parseFloat(document.getElementById("z").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
    });
    document.getElementById("angleX").addEventListener("change", function(evt) {
        var temp = parseFloat(document.getElementById("angleX").value);
        masterAngle[0] = temp * (Math.PI / 180);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
    });
    document.getElementById("angleY").addEventListener("change", function(evt) {
        var temp = parseFloat(document.getElementById("angleY").value);
        masterAngle[1] = temp * (Math.PI / 180);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
    });
    document.getElementById("angleZ").addEventListener("change", function(evt) {
        var temp = parseFloat(document.getElementById("angleZ").value);
        masterAngle[2] = temp * (Math.PI / 180);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
    });
    document.getElementById("scaleX").addEventListener("change", function(evt) {
        masterScale[0] = parseFloat(document.getElementById("scaleX").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
    });
    document.getElementById("scaleY").addEventListener("change", function(evt) {
        masterScale[1] = parseFloat(document.getElementById("scaleY").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
    });
    document.getElementById("scaleZ").addEventListener("change", function(evt) {
        masterScale[2] = parseFloat(document.getElementById("scaleZ").value);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
        drawMaster(masterGL, master3D, masterTypes, masterColor, masterTranslation, masterAngle, masterScale);
    });
}
// *** END Original Code
