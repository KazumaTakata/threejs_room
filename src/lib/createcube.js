import * as THREE from "three";

function createCube() {
  var geometry = new THREE.BoxGeometry(1, 1, 1);
  var material = new THREE.MeshLambertMaterial({ color: 0x66b6ff });
  var cube = new THREE.Mesh(geometry, material);
  return cube;
}

function createPlane() {
  var geometry = new THREE.PlaneGeometry(20, 20);
  var texture = new THREE.TextureLoader().load(
    "model/img/TexturesCom_WoodFine0058_30_seamless_S.jpg"
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 10;
  texture.repeat.y = 10;
  var material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.5,
  });
  var plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = Math.PI / 2;
  return plane;
}

function createWall(centerpoint, rot) {
  var geometry = new THREE.PlaneGeometry(20, 20);
  var texture = new THREE.TextureLoader().load(
    "model/img/photos_2016_1_26_fst_8126d235ec9-0649-433c-b050-b299429e2fb6.jpg"
  );
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 3;
  texture.repeat.y = 3;
  var material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.5,
  });
  var plane = new THREE.Mesh(geometry, material);

  plane.position.z = centerpoint.z;
  plane.position.y = centerpoint.y;
  plane.position.x = centerpoint.x;

  plane.rotation.x = rot.x;
  plane.rotation.y = rot.y;
  plane.rotation.z = rot.z;

  return plane;
}

function addvertex() {
  var geom = new THREE.Geometry();
  var v1 = new THREE.Vector3(0, 0, 0);
  var v2 = new THREE.Vector3(0, 10, 0);
  var v3 = new THREE.Vector3(0, 10, 5);
  var v4 = new THREE.Vector3(0, 0, 5);
  var v5 = new THREE.Vector3(0, 10, 10);
  var v6 = new THREE.Vector3(0, 7, 5);
  var v7 = new THREE.Vector3(0, 7, 10);
  var v8 = new THREE.Vector3(0, 10, 20);
  var v9 = new THREE.Vector3(0, 7, 20);
  var v10 = new THREE.Vector3(0, 0, 10);
  var v11 = new THREE.Vector3(0, 0, 20);

  geom.vertices.push(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11);

  geom.faces.push(
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(0, 2, 3),
    new THREE.Face3(5, 4, 2),
    new THREE.Face3(6, 4, 5),
    new THREE.Face3(8, 7, 6),
    new THREE.Face3(7, 6, 4),
    new THREE.Face3(10, 9, 8),
    new THREE.Face3(8, 9, 6)
  );
  geom.computeBoundingSphere();

  for (let i = 0; i < geom.faces.length; i++) {
    geom.faceVertexUvs[0].push([
      new THREE.Vector2(0, 0), //play with these values
      new THREE.Vector2(0.5, 0),
      new THREE.Vector2(0.5, 0.5),
    ]);
  }

  //updating the uvs
  geom.uvsNeedUpdate = true;

  var texture = new THREE.TextureLoader().load(
    "model/img/photos_2016_1_26_fst_8126d235ec9-0649-433c-b050-b299429e2fb6.jpg"
  );

  var material = new THREE.MeshStandardMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.5,
  });
  var object = new THREE.Mesh(geom, material);
  object.position.z = -10;

  return object;
}

function createWalls() {}

export { createCube, createPlane, createWall, addvertex };
