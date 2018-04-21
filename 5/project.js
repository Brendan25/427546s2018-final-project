window.onload = function() {
    var traX, traY, traZ; //Used for translations.
    var rotX, rotY, rotZ; //Used for rotations.
    var scaX, scaY, scaZ; //Used for scaling.
    var sheX, sheY, sheZ; //Used for shearing.
    
    var traRX = 0, traRY = 0, traRZ = 0; //Used for reverse translations.
    var rotRX = 0, rotRY = 0, rotRZ = 0; //Used for reverse rotations.
    var scaRX = 1, scaRY = 1, scaRZ = 1; //Used for reverse scaling.
    var sheRX = 0, sheRY = 0, sheRZ = 0; //Used for reverse shearing.
    
    traX = parseInt(document.getElementById("xTranslate").value);
    traY = parseInt(document.getElementById("yTranslate").value);
    traZ = parseInt(document.getElementById("zTranslate").value);
    
    rotX = parseInt(document.getElementById("xRotate").value);
    rotY = parseInt(document.getElementById("yRotate").value);
    rotZ = parseInt(document.getElementById("zRotate").value);
    
    scaX = parseInt(document.getElementById("xScale").value);
    scaY = parseInt(document.getElementById("yScale").value);
    scaZ = parseInt(document.getElementById("zScale").value);
    
    sheX = parseInt(document.getElementById("xShear").value);
    sheY = parseInt(document.getElementById("yShear").value);
    sheZ = parseInt(document.getElementById("zShear").value);
    
    

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, 800/800, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    var cameraControls = new THREE.OrbitControls(camera, renderer.domElement);

    var house = new THREE.Group();

    var wallMaterial = new THREE.MeshLambertMaterial( { color: 0x663300 } );
    var roofMaterial = new THREE.MeshLambertMaterial( { color: 0x996633 } );
    var testMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } );


    var right = new THREE.BoxGeometry( 5, 50, 50);
    var rightWall = new THREE.Mesh( right, wallMaterial );
    rightWall.translateX(25);

    house.add(rightWall);

    var left = new THREE.BoxGeometry( 5, 50, 50);
    var leftWall = new THREE.Mesh( left, wallMaterial );
    leftWall.translateX(-25);

    house.add(leftWall);

    var back = new THREE.BoxGeometry( 55, 50, 5);
    var backWall = new THREE.Mesh( back, wallMaterial );
    backWall.translateZ(-25);

    house.add(backWall);

    var front = new THREE.BoxGeometry( 55, 50, 5);
    var frontWall = new THREE.Mesh( front, wallMaterial );
    frontWall.translateZ(25);

    house.add(frontWall)

    var roof = new THREE.CylinderGeometry(1, 50, 40, 4);
    var Roof = new THREE.Mesh( roof, roofMaterial );
    Roof.translateY(40);
    Roof.rotateY(Math.PI / 4);

    house.add(Roof);

    var floor = new THREE.BoxGeometry(55, 5, 55);
    var Floor = new THREE.Mesh( floor, wallMaterial );
    Floor.translateY(-25);
    house.add(Floor);

    var frontDoor = new THREE.BoxGeometry(15, 30, 2);
    var Door = new THREE.Mesh(frontDoor, testMaterial);
    Door.translateZ(27);
    Door.translateY(-10);

    house.add(Door);

    //house.rotateX(240 * (Math.PI / 180));
    //house.rotateY(60 * (Math.PI / 180));

    scene.add(house);

    camera.position.z = 100;

    var light1 = new THREE.PointLight( 0xFFFF00 );
    light1.position.set( 50, 50, -55 );
    scene.add( light1 );

    var light2 = new THREE.PointLight( 0xFFFF00 );
    light2.position.set( -50, 50, -55 );
    scene.add( light2 );

    var light3 = new THREE.PointLight( 0xFFFF00 );
    light3.position.set( 50, 50, 55 );
    scene.add( light3 );

    var light4 = new THREE.PointLight( 0xFFFF00 );
    light4.position.set( -50, 50, 55 );
    scene.add( light4 );
    
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
    
    translateMatrix.multiply(rotateXMatrix);
    translateMatrix.multiply(rotateYMatrix);
    translateMatrix.multiply(rotateZMatrix);
    translateMatrix.multiply(scaleMatrix);
    translateMatrix.multiply(shearMatrix);
    
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
        
        var copyOfOrigMatrix = origMatrix.clone();
        translateMatrix.makeTranslation(traX, traY, traZ);
        rotateXMatrix.makeRotationX(rotX);
        rotateYMatrix.makeRotationY(rotY);
        rotateZMatrix.makeRotationZ(rotZ);
        scaleMatrix.makeScale(scaX, scaY, scaZ);
        shearMatrix.makeShear(sheX, sheY, sheZ);
        
        copyOfOrigMatrix.multiply(translateMatrix);
        copyOfOrigMatrix.multiply(rotateXMatrix);
        copyOfOrigMatrix.multiply(rotateYMatrix);
        copyOfOrigMatrix.multiply(rotateZMatrix);
        copyOfOrigMatrix.multiply(scaleMatrix);
        copyOfOrigMatrix.multiply(shearMatrix);
        
        /*
        var copyList = copyOfOrigMatrix.elements;
        var negaList = negativeOrigMatrix.elements;
        
        var submission = new THREE.Matrix4().set(copyList[0] + negaList[0], copyList[4] + negaList[4], copyList[8] + negaList[8], copyList[12] + negaList[12], copyList[1] + negaList[1], copyList[5] + negaList[5], copyList[9] + negaList[9], copyList[13] + negaList[13], copyList[2] + negaList[2], copyList[6] + negaList[6], copyList[10] + negaList[10], copyList[14] + negaList[14], copyList[3] + negaList[3], copyList[7] + negaList[7], copyList[11] + negaList[11], copyList[15] + negaList[15]);
        */
        scene.applyMatrix(copyOfOrigMatrix);
        
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
        //negativeOrigMatrix = copyOfOrigMatrix.multiplyScalar(-1);
    }
    
    document.getElementById("xTranslate").addEventListener("change", function(evt) {
        traX = parseInt(document.getElementById("xTranslate").value);
        applyChanges();
        //traRX = -traX;
        render();
    });
    document.getElementById("yTranslate").addEventListener("change", function(evt) {
        traY = parseInt(document.getElementById("yTranslate").value);
        applyChanges();
        //traRY = -traY;
        render();
    });
    document.getElementById("zTranslate").addEventListener("change", function(evt) {
        traZ = parseInt(document.getElementById("zTranslate").value);
        applyChanges();
        //traRZ = -traZ;
        render();
    });

    document.getElementById("xRotate").addEventListener("change", function(evt) {
        rotX = (parseInt(document.getElementById("xRotate").value) * Math.PI) / 2;
        applyChanges();
        render();
        //rotRX = -rotX;
    });
    document.getElementById("yRotate").addEventListener("change", function(evt) {
        rotY = (parseInt(document.getElementById("yRotate").value) * Math.PI) / 2;
        applyChanges();
        render();
        //rotRY = -rotY;
    });
    document.getElementById("zRotate").addEventListener("change", function(evt) {
        rotZ = (parseInt(document.getElementById("zRotate").value) * Math.PI) / 2;
        applyChanges();
        render();
        //rotRZ = -rotZ;
    });

    document.getElementById("xScale").addEventListener("change", function(evt) {
        scaX = parseInt(document.getElementById("xScale").value);
        applyChanges();
        render();
        //scaRX = -scaX;
    });
    document.getElementById("yScale").addEventListener("change", function(evt) {
        scaY = parseInt(document.getElementById("yScale").value);
        applyChanges();
        render();
        //scaRY = -scaY;
    });
    document.getElementById("zScale").addEventListener("change", function(evt) {
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
    
    var render = function () {
        cameraControls.update();
        requestAnimationFrame( render );
    
        camera.updateProjectionMatrix();

        renderer.render(scene, camera);
    };

    render();
}