window.onload = function() {
    var traX, traY, traZ; //Used for translations.
    var rotX, rotY, rotZ; //Used for rotations.
    var scaX, scaY, scaZ; //Used for scaling.
    var sheX, sheY, sheZ; //Used for shearing.
    var oneP, twoP, threeP; //Used for perspective projection.
    
    var traRX = 0, traRY = 0, traRZ = 0; //Used for reverse translations.
    var rotRX = 0, rotRY = 0, rotRZ = 0; //Used for reverse rotations.
    var scaRX = 1, scaRY = 1, scaRZ = 1; //Used for reverse scaling.
    var sheRX = 0, sheRY = 0, sheRZ = 0; //Used for reverse shearing.
    var onePRX = 0, twoPRX = 0, threePRX = 0;
    
    var loader = new THREE.TextureLoader();
    
    var frustumSize = 100;
    var aspect = window.innerWidth / window.innerHeight;

    loader.setCrossOrigin("");
    
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
    
    oneP = parseInt(document.getElementById("1Point").value);
    twoP = parseInt(document.getElementById("2Point").value);
    threeP = parseInt(document.getElementById("3Point").value);
    
    
    var scene = new THREE.Scene();
    var camera1 = new THREE.PerspectiveCamera( 75, 800/800, 0.1, 1000 );
    
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
    
    var cameraPOne = new THREE.PerspectiveCamera(100, aspect, 1, 100);
    cameraPOne.position.x = 100;
    cameraPOne.position.y = 0;
    cameraPOne.position.z = 0;
    cameraPOne.lookAt(scene.position);
    
    var cameraPTwo = new THREE.PerspectiveCamera(100, aspect, 1, 100);
    cameraPTwo.position.x = 30;
    cameraPTwo.position.y = 50;
    cameraPTwo.position.z = 0;
    cameraPTwo.lookAt(scene.position);
    
    var cameraPThree = new THREE.PerspectiveCamera(100, aspect, 1, 100);
    cameraPTwo.position.x = 30;
    cameraPTwo.position.y = 50;
    cameraPTwo.position.z = 40;
    cameraPTwo.lookAt(scene.position);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //var cameraControls = new THREE.OrbitControls(camera2, renderer.domElement);

    var house = new THREE.Group();
    
    var woodTexture = loader.load("https://i.pinimg.com/736x/a4/e2/be/a4e2be1d2e4ce0d076cdfc757f18e6e8--wood-plank-texture-wood-planks.jpg");
    
    var woodMaterial = new THREE.MeshBasicMaterial({map: woodTexture});

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
    var frontWall = new THREE.Mesh( front, wallMaterial);
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

    camera1.position.z = 100;

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
    
    document.getElementById("1Point").addEventListener("change", function(evt) {
        oneP = parseInt(document.getElementById("1Point").value);
        applyChanges();
        render();
    });
    document.getElementById("2Point").addEventListener("change", function(evt) {
        twoP = parseInt(document.getElementById("2Point").value);
        applyChanges();
        render();
    });
    document.getElementById("3Point").addEventListener("change", function(evt) {
        threeP = parseInt(document.getElementById("3Point").value);
        applyChanges();
        render();
    });
    
    var render = function () {
        //cameraControls.update();
        requestAnimationFrame( render );
    
        //camera.updateProjectionMatrix();

        renderer.render(scene, cameraPOne);
    };

    render();
}