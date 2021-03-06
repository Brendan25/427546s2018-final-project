//Implement perspective camera by setting up a function that moves the camera backward whilst altering the field of view.

window.onload = function() {
    THREE.ImageUtils.crossOrigin = "use-credentials";
    var traX, traY, traZ; //Used for translations.
    var rotX, rotY, rotZ; //Used for rotations.
    var scaX, scaY, scaZ; //Used for scaling.
    var sheX, sheY, sheZ; //Used for shearing.
    var oneP, twoP, threeP; //Used for perspective projection.
    var lX1, lY1, lZ1;
    var lX2, lY2, lZ2;
    
    var traRX = 0, traRY = 0, traRZ = 0; //Used for reverse translations.
    var rotRX = 0, rotRY = 0, rotRZ = 0; //Used for reverse rotations.
    var scaRX = 1, scaRY = 1, scaRZ = 1; //Used for reverse scaling.
    var sheRX = 0, sheRY = 0, sheRZ = 0; //Used for reverse shearing.
    var onePRX = 0, twoPRX = 0, threePRX = 0;
    
    var frustumSize = 200;
    var aspect = window.innerWidth / window.innerHeight;
    
    var windowSelector = 0;
    
    traX = parseInt(document.getElementById("xTranslate").value);
    traY = parseInt(document.getElementById("yTranslate").value);
    traZ = parseInt(document.getElementById("zTranslate").value);
    
    rotX = (parseInt(document.getElementById("xRotate").value));
    rotY = (parseInt(document.getElementById("yRotate").value));
    rotZ = (parseInt(document.getElementById("zRotate").value));
    
    scaX = parseInt(document.getElementById("xScale").value);
    scaY = parseInt(document.getElementById("yScale").value);
    scaZ = parseInt(document.getElementById("zScale").value);
    
    sheX = parseInt(document.getElementById("xShear").value);
    sheY = parseInt(document.getElementById("yShear").value);
    sheZ = parseInt(document.getElementById("zShear").value);
    
    lX1 = parseInt(document.getElementById("xLight1").value);
    lY1 = parseInt(document.getElementById("yLight1").value);
    lZ1 = parseInt(document.getElementById("zLight1").value);
    
    lX2 = parseInt(document.getElementById("xLight2").value);
    lY2 = parseInt(document.getElementById("yLight2").value);
    lZ2 = parseInt(document.getElementById("zLight2").value);
    
    var scene = new THREE.Scene();
    
    var wall = new THREE.TextureLoader().load("wood-wall.jpg");
    var woodMaterial = new THREE.MeshPhongMaterial({
        bumpMap: wall,
        color: 0x663300
    });
    
    /*
    var wall = new THREE.TextureLoader();
    wall.crossOrigin = "use-credentials";
    wall.load("wood-wall.jpg");
    var wallMaterial = new THREE.MeshStandardMaterial({
        map:wall,
    });
    */

    var lineMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    var wallMaterial = new THREE.MeshPhongMaterial( { color: 0x663300 } );
    var roofMaterial = new THREE.MeshPhongMaterial( { color: 0x996633 } );
    var testMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
    var blackMaterial = new THREE.MeshPhongMaterial( { color: 0x000000 } );
    
    var camera1 = new THREE.PerspectiveCamera( 75, 800/800, 1, 300 );
    camera1.position.z = 100;
    camera1.position.y = 20;
    
    // ***
    var cameraOFront = new THREE.OrthographicCamera(-(frustumSize * aspect) / 2,
                                                    (frustumSize * aspect) / 2,
                                                    frustumSize / 2,
                                                    -(frustumSize / 2));
    
    cameraOFront.position.set(0, 0 , 100);
    cameraOFront.lookAt(scene.position);
    
    var cameraOSide = new THREE.OrthographicCamera(-(frustumSize * aspect) / 2,
                                                    (frustumSize * aspect) / 2,
                                                    frustumSize / 2,
                                                    -(frustumSize / 2));
    
    cameraOSide.position.set(100, 0 , 0);
    cameraOSide.lookAt(scene.position);
    
    var cameraOTop = new THREE.OrthographicCamera(-(frustumSize * aspect) / 2,
                                                    (frustumSize * aspect) / 2,
                                                    frustumSize / 2,
                                                    -(frustumSize / 2));
    
    cameraOTop.position.set(0, 100 , 0);
    cameraOTop.lookAt(scene.position);
    
    var cameraOTri = new THREE.OrthographicCamera(-(frustumSize * aspect) / 2,
                                                    (frustumSize * aspect) / 2,
                                                    frustumSize / 2,
                                                    -(frustumSize / 2));
    
    cameraOTri.position.set(50, 75 , 100);
    cameraOTri.lookAt(scene.position);

    var cameraODiaXY = new THREE.OrthographicCamera(-(frustumSize * aspect) / 2,
                                                    (frustumSize * aspect) / 2,
                                                    frustumSize / 2,
                                                    -(frustumSize / 2));
    
    cameraODiaXY.position.set(100, 100 , 0);
    cameraODiaXY.lookAt(scene.position);
    
    var cameraODiaXZ = new THREE.OrthographicCamera(-(frustumSize * aspect) / 2,
                                                    (frustumSize * aspect) / 2,
                                                    frustumSize / 2,
                                                    -(frustumSize / 2));
    
    cameraODiaXZ.position.set(100, 0 , 100);
    cameraODiaXZ.lookAt(scene.position);
    
    var cameraODiaYZ = new THREE.OrthographicCamera(-(frustumSize * aspect) / 2,
                                                    (frustumSize * aspect) / 2,
                                                    frustumSize / 2,
                                                    -(frustumSize / 2));
    
    cameraODiaYZ.position.set(0, 100 , 100);
    cameraODiaYZ.lookAt(scene.position);
    
    var cameraOIso = new THREE.OrthographicCamera(-(frustumSize * aspect) / 2,
                                                    (frustumSize * aspect) / 2,
                                                    frustumSize / 2,
                                                    -(frustumSize / 2));
    
    cameraOIso.position.set(100, 100 , 100);
    cameraOIso.lookAt(scene.position);
    
    var cameraParallel = new THREE.PerspectiveCamera(100, aspect, 1, 200);
    cameraParallel.position.x = document.getElementById("ParallelX").value;
    cameraParallel.position.y = document.getElementById("ParallelY").value;
    cameraParallel.position.z = document.getElementById("ParallelZ").value;
    cameraParallel.lookAt(scene.position);
    
    /*
    var parallelLineX = new THREE.Geometry();
    parallelLineX.vertices.push(
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(document.getElementById("ParallelX").value, 0, 0)
    );
    var line1 = new THREE.Line(parallelLineX, lineMaterial);
    
    var parallelLineY = new THREE.Geometry();
    parallelLineY.vertices.push(
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0, document.getElementById("ParallelY").value, 0)
    );
    var line2 = new THREE.Line(parallelLineY, lineMaterial);
    
    var parallelLineZ = new THREE.Geometry();
    parallelLineZ.vertices.push(
        new THREE.Vector3(0,0,0),
        new THREE.Vector3(0, 0, document.getElementById("ParallelZ").value)
    );
    var line3 = new THREE.Line(parallelLineZ, lineMaterial);
    
    scene.add(line1);
    scene.add(line2);
    scene.add(line3);
    
    */
    
    var size = 100;
    var divisions = 20;

    var gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );
    
    var cameraOblique = new THREE.OrthographicCamera(100, aspect, 1, 100);
    cameraOblique.position.x = document.getElementById("ObliqueX").value;
    cameraOblique.position.y = document.getElementById("ObliqueY").value;
    cameraOblique.position.z = document.getElementById("ObliqueZ").value;
    cameraOblique.lookAt(scene.position);
    
    scene.background = new THREE.Color(0x808080);

    var renderer = new THREE.WebGLRenderer();
    renderer.canvas = document.getElementById("home");
    renderer.shadowMap.enabled = true;
    renderer.setSize( 700, 700 );
    document.body.appendChild( renderer.domElement );

    //var cameraControls = new THREE.OrbitControls(camera2, renderer.domElement);
    
    /*
    var house2 = new THREE.BoxGeometry();
    house2.translate(25, 0, 25);
    house2.vertices.push(
        new THREE.Vector3(25, 0, -25),
        new THREE.Vector3(25, 50, -25),
        new THREE.Vector3(25, 50, 25)
    );
    
    var two = new THREE.Mesh(house2, wallMaterial);
    */

    var house = new THREE.Group();


    var right = new THREE.BoxGeometry( 5, 50, 50);
    var rightWall = new THREE.Mesh( right, woodMaterial );
    rightWall.translateX(25);
    rightWall.translateY(25);

    house.add(rightWall);

    var left = new THREE.BoxGeometry( 5, 50, 50);
    var leftWall = new THREE.Mesh( left, wallMaterial );
    leftWall.translateX(-25);
    leftWall.translateY(25);

    house.add(leftWall);

    var back = new THREE.BoxGeometry( 55, 50, 5);
    var backWall = new THREE.Mesh( back, wallMaterial );
    backWall.translateZ(-25);
    backWall.translateY(25);

    house.add(backWall);

    var front = new THREE.BoxGeometry( 55, 50, 5);
    var frontWall = new THREE.Mesh( front, wallMaterial);
    frontWall.translateZ(25);
    frontWall.translateY(25);

    house.add(frontWall)

    var roof = new THREE.CylinderGeometry(1, 50, 40, 4);
    var Roof = new THREE.Mesh( roof, roofMaterial );
    Roof.translateY(65);
    Roof.rotateY(Math.PI / 4);

    house.add(Roof);

    var floor = new THREE.BoxGeometry(55, 1, 55);
    var Floor = new THREE.Mesh( floor, wallMaterial );
    house.add(Floor);

    var frontDoor = new THREE.BoxGeometry(15, 30, 2);
    var Door = new THREE.Mesh(frontDoor, testMaterial);
    Door.translateZ(27);
    Door.translateY(15);

    house.add(Door);
    
    var knob = new THREE.CircleGeometry(1);
    var DoorKnob = new THREE.Mesh(knob, blackMaterial);
    DoorKnob.translateZ(30);
    DoorKnob.translateY(15);
    DoorKnob.translateX(4);
    
    house.add(DoorKnob);

    //house.rotateX(240 * (Math.PI / 180));
    //house.rotateY(60 * (Math.PI / 180));

    scene.add(house);

    var light1 = new THREE.PointLight( 0xFFFF00 );
    light1.position.set( lX1, lY1, lZ1 );
    scene.add( light1 );
    
    var light2 = new THREE.PointLight( 0xFFFF00 );
    light2.position.set( lX2, lY2, lZ2 );
    scene.add( light2 );
/*
    var light3 = new THREE.PointLight( 0xFFFF00 );
    light3.position.set( 50, 50, 55 );
    scene.add( light3 );

    var light4 = new THREE.PointLight( 0xFFFF00 );
    light4.position.set( -50, 50, 55 );
    scene.add( light4 );
*/
    var origMatrix = scene.matrix;
    
    var translateMatrix = new THREE.Matrix4();
    translateMatrix.makeTranslation(traX, traY, traZ);
    
    var rotateXMatrix = new THREE.Matrix4();
    rotateXMatrix.makeRotationX(rotX);
    
    var rotateYMatrix = new THREE.Matrix4();
    rotateYMatrix.makeRotationY(rotY);
    
    var rotateZMatrix = new THREE.Matrix4();
    rotateZMatrix.makeRotationZ(rotZ);
    
    var scaleMatrix = new THREE.Matrix4();
    scaleMatrix.makeScale(scaX, scaY, scaZ);
    
    var shearMatrix = new THREE.Matrix4();
    shearMatrix.makeShear(sheX, sheY, sheZ);
    
    var perspectiveMatrix = new THREE.Matrix4().set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, oneP, twoP, threeP, 1);
    
    translateMatrix.multiply(rotateXMatrix);
    translateMatrix.multiply(rotateYMatrix);
    translateMatrix.multiply(rotateZMatrix);
    translateMatrix.multiply(scaleMatrix);
    translateMatrix.multiply(shearMatrix);
    //translateMatrix.multiply(perspectiveMatrix);
    
    scene.applyMatrix(translateMatrix);
    
    var negativeOrigMatrix = new THREE.Matrix4().set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
 
    var applyChanges = function () {
        scene.position.set(0, 0, 0);
        scene.rotation.set(0, 0, 0);
        scene.scale.set(1, 1, 1);
        
        var removePrevious = origMatrix.clone();
        translateMatrix.makeTranslation(traRX, traRY, traRZ);
        rotateXMatrix.makeRotationX(rotRX);
        rotateYMatrix.makeRotationY(rotRY);
        rotateZMatrix.makeRotationZ(rotRZ);
        scaleMatrix.makeScale(scaRX, scaRY, scaRZ);
        shearMatrix.makeShear(sheRX, sheRY, sheRZ);
        perspectiveMatrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, onePRX, twoPRX, threePRX, 1);
        
        /*
        removePrevious.multiply(translateMatrix);
        removePrevious.multiply(rotateXMatrix);
        removePrevious.multiply(rotateYMatrix);
        removePrevious.multiply(rotateZMatrix);
        removePrevious.multiply(scaleMatrix);
        removePrevious.multiply(shearMatrix);
        */        
        scene.applyMatrix(translateMatrix);
        scene.applyMatrix(rotateXMatrix);
        scene.applyMatrix(rotateYMatrix);
        scene.applyMatrix(rotateZMatrix);
        scene.applyMatrix(scaleMatrix);
        scene.applyMatrix(shearMatrix);
        //scene.applyMatrix(perspectiveMatrix);
        
        
        var copyOfOrigMatrix = origMatrix.clone();
        translateMatrix.makeTranslation(traX, traY, traZ);
        rotateXMatrix.makeRotationX(rotX);
        rotateYMatrix.makeRotationY(rotY);
        rotateZMatrix.makeRotationZ(rotZ);
        scaleMatrix.makeScale(scaX, scaY, scaZ);
        shearMatrix.makeShear(sheX, sheY, sheZ);
        perspectiveMatrix.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, oneP, twoP, threeP, 1);
        
        copyOfOrigMatrix.multiply(translateMatrix);
        copyOfOrigMatrix.multiply(rotateXMatrix);
        copyOfOrigMatrix.multiply(rotateYMatrix);
        copyOfOrigMatrix.multiply(rotateZMatrix);
        copyOfOrigMatrix.multiply(scaleMatrix);
        copyOfOrigMatrix.multiply(shearMatrix);
        //copyOfOrigMatrix.multiply(perspectiveMatrix);
        
        scene.applyMatrix(copyOfOrigMatrix);
        
        scene.rotation.x = rotX;
        scene.rotation.y = rotY;
        scene.rotation.z = rotZ;
        
        scene.updateMatrix();
        
        if(traX != 0){traRX = -traX;}else{traRX = 0}
        if(traY != 0){traRY = -traY;}else{traRY = 0} 
        if(traZ != 0){traRZ = -traZ;}else{traRZ = 0} 
        if(rotX != 0){rotRX = -rotX;}else{rotRX = 0} 
        if(rotY != 0){rotRY = -rotY;}else{rotRY = 0} 
        if(rotZ != 0){rotRZ = -rotZ;}else{rotRZ = 0} 
        if(scaX != 1){scaRX = (1/scaX);}else{scaRX = 1} 
        if(scaY != 1){scaRY = (1/scaY);}else{scaRY = 1} 
        if(scaZ != 1){scaRZ = (1/scaZ);}else{scaRZ = 1} 
        if(sheX != 0){sheRX = (-sheX);}else{sheRX = 0} 
        if(sheY != 0){sheRY = (-sheY);}else{sheRY = 0} 
        if(sheZ != 0){sheRZ = (-sheZ);}else{sheRZ = 0}
        if(oneP != 0){onePRX = (-oneP);}else{onePRZ = 0}
        if(twoP != 0){twoPRX = (-twoP);}else{twoPRZ = 0}
        if(threeP != 0){threePRX = (-threeP);}else{threePRZ = 0}
    }
    
    document.getElementById("xTranslate").addEventListener("input", function(evt) {
        traX = parseInt(document.getElementById("xTranslate").value);
        applyChanges();
        //traRX = -traX;
        render();
    });
    document.getElementById("yTranslate").addEventListener("input", function(evt) {
        traY = parseInt(document.getElementById("yTranslate").value);
        applyChanges();
        //traRY = -traY;
        render();
    });
    document.getElementById("zTranslate").addEventListener("input", function(evt) {
        traZ = parseInt(document.getElementById("zTranslate").value);
        applyChanges();
        //traRZ = -traZ;
        render();
    });

    document.getElementById("xRotate").addEventListener("input", function(evt) {
        rotX = parseInt(document.getElementById("xRotate").value) * (Math.PI / 8);
        applyChanges();
        render();
        //rotRX = -rotX;
    });
    document.getElementById("yRotate").addEventListener("input", function(evt) {
        rotY = parseInt(document.getElementById("yRotate").value) * (Math.PI / 8);
        applyChanges();
        render();
        //rotRY = -rotY;
    });
    document.getElementById("zRotate").addEventListener("input", function(evt) {
        rotZ = parseInt(document.getElementById("zRotate").value) * (Math.PI / 8);
        applyChanges();
        render();
        //rotRZ = -rotZ;
    });

    document.getElementById("xScale").addEventListener("input", function(evt) {
        scaX = parseInt(document.getElementById("xScale").value);
        applyChanges();
        render();
        //scaRX = -scaX;
    });
    document.getElementById("yScale").addEventListener("input", function(evt) {
        scaY = parseInt(document.getElementById("yScale").value);
        applyChanges();
        render();
        //scaRY = -scaY;
    });
    document.getElementById("zScale").addEventListener("input", function(evt) {
        scaZ = parseInt(document.getElementById("zScale").value);
        applyChanges();
        render();
        //scaRZ = -scaZ;
    });

    document.getElementById("xShear").addEventListener("change", function(evt) {
        sheX = parseInt(document.getElementById("xShear").value);
        applyChanges();
        render();
        //sheRX = -sheX;
    });
    document.getElementById("yShear").addEventListener("change", function(evt) {
        sheY = parseInt(document.getElementById("yShear").value);
        applyChanges();
        render();
        //sheRY = -sheY;
    });
    document.getElementById("zShear").addEventListener("change", function(evt) {
        sheZ = parseInt(document.getElementById("zShear").value);
        applyChanges();
        render();
        //sheRZ = -sheZ;
    });
    
    document.getElementById("PDefault").addEventListener("click", function(evt) {
        windowSelector = 0;
        render();
    });
    document.getElementById("OFront").addEventListener("click", function(evt) {
        windowSelector = 1;
        render();
    });
    document.getElementById("OSide").addEventListener("click", function(evt) {
        windowSelector = 2;
        render();
    });
    document.getElementById("OTop").addEventListener("click", function(evt) {
        windowSelector = 3;
        render();
    });
    
    document.getElementById("Trimetric").addEventListener("click", function(evt) {
        windowSelector = 4;
        render();
    });
    document.getElementById("DimetricXY").addEventListener("click", function(evt) {
        windowSelector = 5;
        render();
    });
    document.getElementById("DimetricXZ").addEventListener("click", function(evt) {
        windowSelector = 6;
        render();
    });
    document.getElementById("DimetricYZ").addEventListener("click", function(evt) {
        windowSelector = 7;
        render();
    });
    document.getElementById("Isometric").addEventListener("click", function(evt) {
        windowSelector = 8;
        render();
    });
    
    document.getElementById("EnableParallel").addEventListener("click", function(evt) {
        document.getElementById("ParallelPerspective").style.display = "block";
        
        document.getElementById("ObliqueX").value = 0;
        document.getElementById("ObliqueY").value = 0;
        document.getElementById("ObliqueZ").value = 0;
        document.getElementById("ParallelX").value = 0;
        document.getElementById("ParallelY").value = 0;
        document.getElementById("ParallelZ").value = 0;
        
        windowSelector = 9;
    });
    document.getElementById("ParallelX").addEventListener("input", function(evt) {
        cameraParallel.position.x = document.getElementById("ParallelX").value;
        cameraParallel.position.y = document.getElementById("ParallelY").value;
        cameraParallel.position.z = document.getElementById("ParallelZ").value;
        cameraParallel.lookAt(scene.position);
        render();
    });
    document.getElementById("ParallelY").addEventListener("input", function(evt) {
        cameraParallel.position.x = document.getElementById("ParallelX").value;
        cameraParallel.position.y = document.getElementById("ParallelY").value;
        cameraParallel.position.z = document.getElementById("ParallelZ").value;
        cameraParallel.lookAt(scene.position);
        render();
    });
    document.getElementById("ParallelZ").addEventListener("input", function(evt) {
        cameraParallel.position.x = document.getElementById("ParallelX").value;
        cameraParallel.position.y = document.getElementById("ParallelY").value;
        cameraParallel.position.z = document.getElementById("ParallelZ").value;
        cameraParallel.lookAt(scene.position);
        render();
    });
    
    document.getElementById("EnableOblique").addEventListener("click", function(evt) {
        document.getElementById("ObliquePerspective").style.display = "block";
                
        document.getElementById("ObliqueX").value = 0;
        document.getElementById("ObliqueY").value = 0;
        document.getElementById("ObliqueZ").value = 0;
        document.getElementById("ParallelX").value = 0;
        document.getElementById("ParallelY").value = 0;
        document.getElementById("ParallelZ").value = 0;
        
        windowSelector = 10;
    });
    document.getElementById("ObliqueX").addEventListener("change", function(evt) {
        cameraOblique.position.x = document.getElementById("ObliqueX").value;
        cameraOblique.position.y = document.getElementById("ObliqueY").value;
        cameraOblique.position.z = document.getElementById("ObliqueZ").value;
        cameraOblique.lookAt(scene.position);
        render();
    });
    document.getElementById("ObliqueY").addEventListener("change", function(evt) {
        cameraOblique.position.x = document.getElementById("ObliqueX").value;
        cameraOblique.position.y = document.getElementById("ObliqueY").value;
        cameraOblique.position.z = document.getElementById("ObliqueZ").value;
        cameraOblique.lookAt(scene.position);
        render();
    });
    document.getElementById("ObliqueZ").addEventListener("change", function(evt) {
        cameraOblique.position.x = document.getElementById("ObliqueX").value;
        cameraOblique.position.y = document.getElementById("ObliqueY").value;
        cameraOblique.position.z = document.getElementById("ObliqueZ").value;
        cameraOblique.lookAt(scene.position);
        render();
    });
    
    document.getElementById("xLight1").addEventListener("input", function(evt) {
        lX1 = document.getElementById("xLight1").value;
        light1.position.set( lX1, lY1, lZ1 );
        render();
    });
    document.getElementById("yLight1").addEventListener("input", function(evt) {
        lY1 = document.getElementById("yLight1").value;
        light1.position.set( lX1, lY1, lZ1 );
        render();
    });
    document.getElementById("zLight1").addEventListener("input", function(evt) {
        lZ1 = document.getElementById("zLight1").value;
        light1.position.set( lX1, lY1, lZ1 );
        render();
    });
    
    document.getElementById("xLight2").addEventListener("input", function(evt) {
        lX2 = document.getElementById("xLight2").value;
        light2.position.set( lX2, lY2, lZ2 );
        render();
    });
    document.getElementById("yLight2").addEventListener("input", function(evt) {
        lY2 = document.getElementById("yLight2").value;
        light2.position.set( lX2, lY2, lZ2 );
        render();
    });
    document.getElementById("zLight2").addEventListener("input", function(evt) {
        lZ2 = document.getElementById("zLight2").value;
        light2.position.set( lX2, lY2, lZ2 );
        render();
    });
    
    var render = function () {
        //cameraControls.update();
        requestAnimationFrame( render );
    
        //camera.updateProjectionMatrix();
        switch(windowSelector){
            case 0:
                renderer.render(scene, camera1);
                break;
            case 1:
                renderer.render(scene, cameraOFront);
                break;
            case 2:
                renderer.render(scene, cameraOSide);
                break;
            case 3:
                renderer.render(scene, cameraOTop);
                break;
            case 4:
                renderer.render(scene, cameraOTri);
                break;
            case 5:
                renderer.render(scene, cameraODiaXY);
                break;
            case 6:
                renderer.render(scene, cameraODiaXZ);
                break;
            case 7:
                renderer.render(scene, cameraODiaYZ);
                break;
            case 8:
                renderer.render(scene, cameraOIso);
                break;
            case 9:
                renderer.render(scene, cameraParallel);
                break;
            case 10:
                renderer.render(scene, cameraOblique);
                break;
        }
    };

    render();
}