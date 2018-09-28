/**
 * @author mrdoob / http://mrdoob.com/
 * @author Mugen87 / https://github.com/Mugen87
 */

import * as THREE from "three";

let PointerLockControls = function(camera) {
  var scope = this;
  this.camera = camera;
  this.domElement = document.body;
  this.isLocked = false;
  this.moveForward = false;
  this.moveBackward = false;
  this.moveLeft = false;
  this.moveRight = false;
  this.canJump = false;
  this.nowtime = performance.now();
  this.prevtime = performance.now();
  this.velocity = new THREE.Vector3();
  this.direction = new THREE.Vector3();
  this.raycasterForward = new THREE.Raycaster(
    new THREE.Vector3(),
    new THREE.Vector3(0, -1, 0),
    0,
    3
  );

  this.cameraDir = new THREE.Vector3(0, 0, -1);

  this.onKeyDown = camera.rotation.set(0, 0, 0);

  var pitchObject = new THREE.Object3D();
  pitchObject.add(camera);

  var yawObject = new THREE.Object3D();
  yawObject.position.y = 10;
  yawObject.add(pitchObject);

  var PI_2 = Math.PI / 2;

  function onMouseMove(event) {
    if (scope.isLocked === false) return;

    var movementX =
      event.movementX || event.mozMovementX || event.webkitMovementX || 0;
    var movementY =
      event.movementY || event.mozMovementY || event.webkitMovementY || 0;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(
      -PI_2,
      Math.min(PI_2, pitchObject.rotation.x)
    );
  }

  function onPointerlockChange() {
    if (document.pointerLockElement === scope.domElement) {
      scope.dispatchEvent({ type: "lock" });

      scope.isLocked = true;
    } else {
      scope.dispatchEvent({ type: "unlock" });

      scope.isLocked = false;
    }
  }
  this.onKeyDown = function(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = true;
        break;
      case 37: // left
      case 65: // a
        this.moveLeft = true;
        break;
      case 40: // down
      case 83: // s
        this.moveBackward = true;
        break;
      case 39: // right
      case 68: // d
        this.moveRight = true;
        break;
      case 32: // space
        if (this.canJump === true) velocity.y += 350;
        this.canJump = false;
        break;
    }
  };
  this.onKeyUp = function(event) {
    switch (event.keyCode) {
      case 38: // up
      case 87: // w
        this.moveForward = false;
        break;
      case 37: // left
      case 65: // a
        this.moveLeft = false;
        break;
      case 40: // down
      case 83: // s
        this.moveBackward = false;
        break;
      case 39: // right
      case 68: // d
        this.moveRight = false;
        break;
    }
  };

  this.onKeyDown = this.onKeyDown.bind(this);
  this.onKeyUp = this.onKeyUp.bind(this);

  document.addEventListener("keydown", this.onKeyDown, false);
  document.addEventListener("keyup", this.onKeyUp, false);

  function onPointerlockError() {
    console.error("THREE.PointerLockControls: Unable to use Pointer Lock API");
  }

  this.connect = function() {
    document.addEventListener("mousemove", onMouseMove, false);
    document.addEventListener("pointerlockchange", onPointerlockChange, false);
    document.addEventListener("pointerlockerror", onPointerlockError, false);
  };

  this.disconnect = function() {
    document.removeEventListener("mousemove", onMouseMove, false);
    document.removeEventListener(
      "pointerlockchange",
      onPointerlockChange,
      false
    );
    document.removeEventListener("pointerlockerror", onPointerlockError, false);
  };

  this.dispose = function() {
    this.disconnect();
  };

  this.getObject = function() {
    return yawObject;
  };

  this.update = function(objects) {
    this.nowtime = performance.now();
    var delta = (this.nowtime - this.prevtime) / 1000;
    this.velocity.x -= this.velocity.x * 10.0 * delta;
    this.velocity.z -= this.velocity.z * 10.0 * delta;
    // velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
    this.direction.z = Number(this.moveForward) - Number(this.moveBackward);
    this.direction.x = Number(this.moveLeft) - Number(this.moveRight);
    this.direction.normalize(); // this ensures consistent movements in all directions
    if (this.moveForward || this.moveBackward)
      this.velocity.z -= this.direction.z * 400.0 * delta;
    if (this.moveLeft || this.moveRight)
      this.velocity.x -= this.direction.x * 400.0 * delta;
    // if (onObject === true) {
    //   velocity.y = Math.max(0, velocity.y);
    //   canJump = true;
    // }
    this.getObject().translateX(this.velocity.x * delta);
    this.getObject().translateY(this.velocity.y * delta);
    this.getObject().translateZ(this.velocity.z * delta);
    // if (this.getObject().position.y < 10) {
    //   velocity.y = 0;
    //   controls.getObject().position.y = 10;
    //   canJump = true;
    // }
    this.prevtime = this.nowtime;

    var vector = new THREE.Vector3(0, 0, -1);
    let dirVector = vector.applyQuaternion(this.getObject().quaternion);

    this.cameraDir = dirVector;
    this.raycasterForward.ray.direction = this.cameraDir;
    this.raycasterForward.ray.origin.copy(this.getObject().position);

    var intersections = this.raycasterForward.intersectObjects(objects);
    console.log(intersections);
  };

  this.getDirection = (function() {
    // assumes the camera itself is not rotated

    var direction = new THREE.Vector3(0, 0, -1);
    var rotation = new THREE.Euler(0, 0, 0, "YXZ");

    return function(v) {
      rotation.set(pitchObject.rotation.x, yawObject.rotation.y, 0);

      v.copy(direction).applyEuler(rotation);

      return v;
    };
  })();

  this.lock = function() {
    this.domElement.requestPointerLock();
  };

  this.unlock = function() {
    document.exitPointerLock();
  };

  this.connect();
};

PointerLockControls.prototype = Object.create(THREE.EventDispatcher.prototype);
PointerLockControls.prototype.constructor = PointerLockControls;

export { PointerLockControls };
