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
    
        var colorLocation = gl.getUniformLocation(program, "u_color");
    
        var translationLocation = gl.getUniformLocation(program, "u_translation");

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
        }
    
        gl.uniform4fv(colorLocation, color);
        gl.uniform2fv(translationLocation, translation);
        gl.drawArrays(primitiveType, offset, count);
}

function draw3D(gl, positions, count, prim, color, translation) {
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
    
    var colorLocation = gl.getUniformLocation(program, "u_color");
    
    var translationLocation = gl.getUniformLocation(program, "u_translation");

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
    }
    
    gl.uniform4fv(colorLocation, color);
    gl.uniform2fv(translationLocation, translation);
    gl.drawArrays(primitiveType, offset, count);
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
    var f = 0;
    frontA[f] = new Array(); 
    frontTypes.push("line");
    
    var sideA = new Array(); 
    var s = 0;
    var sideTypes = new Array();
    sideA[s] = new Array(); 
    sideTypes.push("line");
    
    var topA = new Array(); 
    var t = 0;
    var topTypes = new Array();
    topA[t] = new Array(); 
    topTypes.push("line");
    
    var masterTypes = new Array();
    
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
    });
    document.getElementById("frontPolyline").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("polyline");
    });
    document.getElementById("frontCircle").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("circle");
    });
    document.getElementById("frontTriangle").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("triangle");
    });
    document.getElementById("frontRectangle").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("rectangle");
    });
    document.getElementById("frontPolygon").addEventListener("click", function(evt) {
        f++;
        frontA[f] = new Array();
        frontTypes.push("polygon");
    });

//Constructors for each new shape on the Side Portion.
    document.getElementById("sideLine").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("line");
    });
    document.getElementById("sidePolyline").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("polyline");
    });
    document.getElementById("sideCircle").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("circle");
    });
    document.getElementById("sideTriangle").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("triangle");
    }); 
    document.getElementById("sideRectangle").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("rectangle");
    });
    document.getElementById("sidePolygon").addEventListener("click", function(evt) {
        s++;
        sideA[s] = new Array();
        sideTypes.push("polygon");
    });

//Constructors for each new shape on the Top Portion.
    document.getElementById("topLine").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("line");
    });
    document.getElementById("topPolyline").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("polyline");
    });
    document.getElementById("topCircle").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("circle");
    });
    document.getElementById("topTriangle").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("triangle");
    });  
    document.getElementById("topRectangle").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("rectangle");
    });
    document.getElementById("topPolygon").addEventListener("click", function(evt) {
        t++;
        topA[t] = new Array();
        topTypes.push("polygon");
    });

//Canvas Listeners that draw the given objects on click by user.
    document.getElementById("frontCanvas").addEventListener("click", function(evt) {
        var mousePosition = getMousePosition(front, evt);
        var newX = mousePosition.x / front.width * 2 - 1;
        var newY = -(mousePosition.y / front.height * 2 - 1);
        var shape;
        var counter = 0;
        
        frontA[f].push(newX);
        frontA[f].push(newY);
        
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
                    //More needed here.
                } else if(frontTypes[counter] == "triangle") {
                    shape = "TRIANGLE";
                } else if(frontTypes[counter] == "rectangle") {
                    shape = "TRIANGLE";
                    //More needed here
                } else if(frontTypes[counter] == "polygon") {
                    //Dunno yet.
                    shape = "TRIANGLE_FAN";
                }
                draw2D(frontGL, frontA[counter], ((frontA[counter].length) / 2), shape);
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
        
        sideA[s].push(newX);
        sideA[s].push(newY);
        
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
                    //More needed here.
                } else if(sideTypes[counter] == "triangle") {
                    shape = "TRIANGLE";
                } else if(sideTypes[counter] == "rectangle") {
                    shape = "TRIANGLE";
                    //More needed here
                } else if(sideTypes[counter] == "polygon") {
                    //Dunno yet.
                }
                draw2D(sideGL, sideA[counter], ((sideA[counter].length) / 2), shape);
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
        
        topA[t].push(newX);
        topA[t].push(newY);
        
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
                    shape = "TRIANGLE";
                    //More needed here
                } else if(topTypes[counter] == "polygon") {
                    //Dunno yet.
                }
                draw2D(topGL, topA[counter], ((topA[counter].length) / 2), shape);
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
        var master3D = new Array(); var masterSize = 0; 
        //MasterTypes defined onLoad to correct errors.
        var num_of_shapes = -1;
        
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
                var coorCount = frontA[i].length / 2;
                for(j = 0; j < (coorCount); j++) {
                    //While j is less than the number of coordinates in the current shape.
                    newX = frontA[i].shift();
                    newY = frontA[i].shift();
                    newZ = -1;
                    
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
                var coorCount = sideA[i].length / 2;
                for(j = 0; j < (coorCount); j++) {
                    //While j is less than the number of coordinates in the current shape.
                    newZ = sideA[i].shift();
                    newY = sideA[i].shift();
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
                var coorCount = topA[i].length / 2;
                for(j = 0; j < (coorCount); j++) {
                    //While j is less than the number of coordinates in the current shape.
                    newX = topA[i].shift();
                    newZ = topA[i].shift();
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
        if(master3D.length > 0) {
            //Use the points gathered in masterSize to create a 3D image with three sides drawn using Triangle_Strip.
            var coordinate_num;
            while(i < master3D.length) {
                if(master3D[i].length > 0) {
                    coordinate_num = (master3D[i].length / 3);
                    if(masterTypes[i] == "line") {
                        shape = "LINES";
                    } else if(masterTypes[i] == "polyline") {
                        shape = "LINE_STRIP";
                    } else if(masterTypes[i] == "circle") {
                        shape = "TRIANGLE_FAN";
                        //More needed here.
                    } else if(masterTypes[i] == "triangle") {
                        shape = "TRIANGLE";
                    } else if(masterTypes[i] == "rectangle") {
                        shape = "TRIANGLE";
                        //More needed here
                    } else if(masterTypes[i] == "polygon") {
                        //Dunno yet.
                    }
                    draw3D(masterGL, master3D[i], ((master3D[i].length) / 3), shape);
                }
                i++;
            }   
        }
        master3D = [];
    });
    document.getElementById("new").addEventListener("click", function(evt) {
        frontGL.clearColor(0, 0, 0, 0);
        frontGL.clear(frontGL.COLOR_BUFFER_BIT);
        sideGL.clearColor(0, 0, 0, 0);
        sideGL.clear(frontGL.COLOR_BUFFER_BIT);
        topGL.clearColor(0, 0, 0, 0);
        topGL.clear(frontGL.COLOR_BUFFER_BIT);
        masterGL.clearColor(0, 0, 0, 0);
        masterGL.clear(frontGL.COLOR_BUFFER_BIT);
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
        masterTypes = [];
        toggleCanvas2();
    });
}
