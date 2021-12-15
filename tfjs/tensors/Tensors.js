tf.tensor()

tf.tensor([1,2,3], [3,1])

tf.tensor([1,2,3], [3,1]).print()
//Tensor
//    [[1],
//     [2],
//     [3]]
tf.tensor([1,2,3], [3,3,0]).print()

tf.tensor([1,2,3], [1,3]).print()
//Tensor
//     [[1, 2, 3],]

tf.tensor([1,2,3], [3,1]).print()
//Tensor
//    [[1],
//     [2],
//     [3]]

let values = new Array(20).fill(0).map(v => Math.random())

values
// (20) [0.8690838945019532, 0.7845907634298797, 0.8404645629018177, 0.6566315553706201, 0.981497468635967, 0.37611725324583434, 0.9893076896139108, 0.06583780693572572, 0.9442678820960788, 0.3992932473071322, 0.6306797521973415, 0.6355332611092459, 0.7337538861051918, 0.8355916498919436, 0.9258356705499349, 0.32834213082402663, 0.3640667070841239, 0.08091176932047706, 0.9562004494008696, 0.01056157182658879]
const matrix = tf.tensor2d(values, [2,5,2])

const matrix = tf.tensor2d(values, [5,2])

const matrix = tf.tensor3d(values, [2,2,5])

matrix.print()
//Tensor
//    [[[0.8690839, 0.7845908, 0.8404646, 0.6566315, 0.9814975],
//      [0.3761173, 0.9893077, 0.0658378, 0.9442679, 0.3992932]],
//
//     [[0.6306797, 0.6355333, 0.7337539, 0.8355917, 0.9258357],
//      [0.3283421, 0.3640667, 0.0809118, 0.9562004, 0.0105616]]]

const matrix = tf.tensor3d(values, [2,5,2])

matrix.print()
//Tensor
//    [[[0.8690839, 0.7845908],
//      [0.8404646, 0.6566315],
//      [0.9814975, 0.3761173],
//      [0.9893077, 0.0658378],
//      [0.9442679, 0.3992932]],
//
//     [[0.6306797, 0.6355333],
//      [0.7337539, 0.8355917],
//      [0.9258357, 0.3283421],
//      [0.3640667, 0.0809118],
//      [0.9562004, 0.0105616]]]
matrix.pow(2).print()

const a = tf.tensor2d(new Array(4).fill(0).map(v => Math.random()), [2,2])

a.print()

//Tensor
//   [[0.9034537, 0.0574826],
//     [0.0559412, 0.6706904]]

const b = tf.tensor2d(new Array(4).fill(0).map(v => Math.random()), [2,2])

b.print()

//Tensor
//    [[0.7992389, 0.4206164],
//     [0.2785084, 0.5519873]]

a.add(b)

// e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 4, …}

a.add(b).print()

//Tensor
//    [[1.7026925, 0.478099 ],
//     [0.3344496, 1.2226777]]

a.print()

//Tensor
//    [[0.9034537, 0.0574826],
//     [0.0559412, 0.6706904]]

const sumOfAAndB = a.add(b)

sumOfAAndB

//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 4, …}

sumOfAAndB.print()
//Tensor
//    [[1.7026925, 0.478099 ],
//     [0.3344496, 1.2226777]]

let unitMatrix = tf.tensor2d([1,0,1,0], [2,2])


//Tensor
//    [[1, 0],
//     [1, 0]]

let unitMatrix = tf.tensor2d([1,0,0,1], [2,2])

unitMatrix.print()
//Tensor
//    [[1, 0],
//     [0, 1]]

let sumOfAAndBTimesUnitMatrix = sumOfAAndB.mul(unitMatrix)

sumOfAAndBTimesUnitMatrix.print() // By using mul the elements of both tensors (2x2 matrices in this example) get multiplied element-wise
//Tensor
//    [[1.7026925, 0        ],
//     [0        , 1.2226777]]

let sumOfAAndBTimesUnitMatrix = sumOfAAndB.matMul(unitMatrix)

sumOfAAndBTimesUnitMatrix.print() // By using matMul the real matrix multiplication is executed on the tensors.
//Tensor
//    [[1.7026925, 0.478099 ],
//     [0.3344496, 1.2226777]]
