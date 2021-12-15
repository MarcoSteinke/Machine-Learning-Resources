tf.tensor([1,2,3], [3,1])

tf.tensor([1,2,3], [3,1]).print()
//Tensor
//    [[1],
//     [2],
//     [3]]

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

matrix = tf.tensor3d(values, [2,2,5])

matrix.print()
//Tensor
//    [[[0.8690839, 0.7845908, 0.8404646, 0.6566315, 0.9814975],
//      [0.3761173, 0.9893077, 0.0658378, 0.9442679, 0.3992932]],
//
//     [[0.6306797, 0.6355333, 0.7337539, 0.8355917, 0.9258357],
//      [0.3283421, 0.3640667, 0.0809118, 0.9562004, 0.0105616]]]

matrix = tf.tensor3d(values, [2,5,2])

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

unitMatrix = tf.tensor2d([1,0,0,1], [2,2])

unitMatrix.print()
//Tensor
//    [[1, 0],
//     [0, 1]]

let sumOfAAndBTimesUnitMatrix = sumOfAAndB.mul(unitMatrix)

sumOfAAndBTimesUnitMatrix.print() // By using mul the elements of both tensors (2x2 matrices in this example) get multiplied element-wise
//Tensor
//    [[1.7026925, 0        ],
//     [0        , 1.2226777]]

sumOfAAndBTimesUnitMatrix = sumOfAAndB.matMul(unitMatrix)

sumOfAAndBTimesUnitMatrix.print() // By using matMul the real matrix multiplication is executed on the tensors.
//Tensor
//    [[1.7026925, 0.478099 ],
//     [0.3344496, 1.2226777]]

// some math for neural networks:

const weights1 = tf.tensor1d(new Array(8).fill(0).map(v => Math.random()), 'float32', [1,8])
weights1.print()
const input = tf.tensor1d(new Array(8).fill(0).map(v => Math.random()*255), 'int32', [1,8])
input.print()
const resultOfLayer1 = input.mul(weights1)
console.log("Result after layer1 for input:");
resultOfLayer1.print()

// Some matrix and vector multiplication:
let vector = tf.tensor1d([1,-2], 'int32', [2,1])
undefined
vector.print()
//Tensor
//    [1, -2]

let xorInput = tf.tensor2d([0,0,0,1,1,0,1,1], [4,2])

// matMul not working because innerDimension is not fitting
//xorInput.matMul(vector)

xorInput.mul(vector)
//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}
xorInput.mul(vector).print()
//Tensor
//    [[0, 0 ],
//     [0, -2],
//     [1, 0 ],
//     [1, -2]]
undefined
xorInput.mul(vector).relu()
//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}
xorInput.mul(vector).relu().print()
//Tensor
//    [[0, 0],
//     [0, 0],
//     [1, 0],
//     [1, 0]]

// implementation of the xor neural net by hand

let weights = tf.tensor2d([1,1,1,1], [2,2])

weights.print()
//Tensor
//    [[1, 1],
//     [1, 1]]

input.print()

//Tensor
//    [88, 106, 28, 59, 125, 171, 149, 153]

xorInput.print()

//Tensor
//    [[0, 0],
//     [0, 1],
//     [1, 0],
//     [1, 1]]

xorInput.mul(weights)

//operation.js:57 Uncaught Error: Operands could not be broadcast together with shapes 4,2 and 2,2.
//    at iN (broadcast_util.js:81)
//    at binary_impl.js:29
//    at Object.PJ [as kernelFunc] (Multiply.js:85)
//    at n (engine.js:644)
//    at engine.js:711
//    at e.t.scopedRun (engine.js:478)
//    at e.t.runKernelFunc (engine.js:707)
//    at e.t.runKernel (engine.js:551)
//    at mul_ (mul.js:60)
//    at mul__op (operation.js:51)
//iN @ broadcast_util.js:81
//(anonym) @ binary_impl.js:29
//PJ @ Multiply.js:85
//n @ engine.js:644
//(anonym) @ engine.js:711
//t.scopedRun @ engine.js:478
//t.runKernelFunc @ engine.js:707
//t.runKernel @ engine.js:551
//mul_ @ mul.js:60
//mul__op @ operation.js:51
//Kw.mul @ mul.js:30
//(anonym) @ VM3299:1

xorInput.matMul(weights)

//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.matMul(weights).print()

//Tensor
//    [[0, 0],
//     [1, 1],
//     [1, 1],
//     [2, 2]]

let bias = tf.tensor1d([0,-1], [2,1])

//util.js:67 Uncaught Error: Unknown data type 2,1
//    at Aw (util.js:69)
//    at Ek (tensor_ops_util.js:73)
//    at Object.VE [as tensor1d] (tensor1d.js:48)
//    at <anonymous>:1:15
//Aw @ util.js:69
//Ek @ tensor_ops_util.js:73
//VE @ tensor1d.js:48
//(anonym) @ VM3432:1

let bias = tf.tensor1d([0,-1], 'int32', [2,1])

bias.print()

//Tensor
//    [0, -1]

xorInput.mul(vector).relu().add(bias)

//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.mul(vector).relu().add(bias).print()

// Tensor
//     [[0, -1],
//      [0, -1],
//      [1, -1],
//      [1, -1]]

xorInput.mul(vector).relu()

// e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.mul(vector).relu().print()

//Tensor
//    [[0, 0],
//     [0, 0],
//     [1, 0],
//     [1, 0]]

xorInput.mul(vector)

// e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.matMul(weights).print()

//Tensor
//    [[0, 0],
//     [1, 1],
//     [1, 1],
//     [2, 2]]

xorInput.matMul(weights).relu()

//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.matMul(weights).relu().print()

//Tensor
//    [[0, 0],
//     [1, 1],
//     [1, 1],
//     [2, 2]]

xorInput.matMul(weights).relu().add(bias).print()

//Tensor
//    [[0, -1],
//     [1, 0 ],
//     [1, 0 ],
//     [2, 1 ]]

xorInput.matMul(weights).relu().add(bias).relu()

// e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.matMul(weights).relu().add(bias).relu().print()

//Tensor
//    [[0, 0],
//     [1, 0],
//     [1, 0],
//     [2, 1]]

let weights2 = tf.tensor1d([1,-2], 'int32', [2,1])

xorInput.matMul(weights).relu().add(bias).relu().mul(weights2)

// e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.matMul(weights).relu().add(bias).relu().mul(weights2).print()

//Tensor
//    [[0, 0 ],
//     [1, 0 ],
//     [1, 0 ],
//     [2, -2]]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2).print()

// operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (undefined) of Tensors with shapes 4,2 and 2 and transposeA=false and transposeB=false must match.
//     at Vv (util_base.js:153)
//     at QJ (BatchMatMul_impl.js:76)
//     at Object.kernelFunc (BatchMatMul.js:32)
//     at n (engine.js:644)
//     at engine.js:711
//     at e.t.scopedRun (engine.js:478)
//     at e.t.runKernelFunc (engine.js:707)
//     at e.t.runKernel (engine.js:551)
//     at matMul_ (mat_mul.js:54)
//     at matMul__op (operation.js:51)
// Vv @ util_base.js:153
// QJ @ BatchMatMul_impl.js:76
// kernelFunc @ BatchMatMul.js:32
// n @ engine.js:644
// (anonym) @ engine.js:711
// t.scopedRun @ engine.js:478
// t.runKernelFunc @ engine.js:707
// t.runKernel @ engine.js:551
// matMul_ @ mat_mul.js:54
// matMul__op @ operation.js:51
// Kw.matMul @ mat_mul.js:33
// (anonym) @ VM4225:1

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2.transpose())

// operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (undefined) of Tensors with shapes 4,2 and 2 and transposeA=false and transposeB=false must match.
//     at Vv (util_base.js:153)
//     at QJ (BatchMatMul_impl.js:76)
//     at Object.kernelFunc (BatchMatMul.js:32)
//     at n (engine.js:644)
//     at engine.js:711
//     at e.t.scopedRun (engine.js:478)
//     at e.t.runKernelFunc (engine.js:707)
//     at e.t.runKernel (engine.js:551)
//     at matMul_ (mat_mul.js:54)
//     at matMul__op (operation.js:51)
// Vv @ util_base.js:153
// QJ @ BatchMatMul_impl.js:76
// kernelFunc @ BatchMatMul.js:32
// n @ engine.js:644
// (anonym) @ engine.js:711
// t.scopedRun @ engine.js:478
// t.runKernelFunc @ engine.js:707
// t.runKernel @ engine.js:551
// matMul_ @ mat_mul.js:54
// matMul__op @ operation.js:51
// Kw.matMul @ mat_mul.js:33
// (anonym) @ VM4286:1

xorInput.matMul(weights).relu().add(bias).relu().mul(weights2.transpose())

//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.matMul(weights).relu().add(bias).relu().mul(weights2.transpose()).print()

// Tensor
//     [[0, 0 ],
//      [1, 0 ],
//      [1, 0 ],
//      [2, -2]]

let weights2 = tf.tensor1d([1,-2], 'int32', [1,2])

weights2.print()

//Tensor
//    [1, -2]

xorInput.matMul(weights).relu().add(bias).relu().mul(weights2).print()
// Tensor
//     [[0, 0 ],
//      [1, 0 ],
//      [1, 0 ],
//      [2, -2]]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2).print()

// operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (undefined) of Tensors with shapes 4,2 and 2 and transposeA=false and transposeB=false must match.
//     at Vv (util_base.js:153)
//     at QJ (BatchMatMul_impl.js:76)
//     at Object.kernelFunc (BatchMatMul.js:32)
//     at n (engine.js:644)
//     at engine.js:711
//     at e.t.scopedRun (engine.js:478)
//     at e.t.runKernelFunc (engine.js:707)
//     at e.t.runKernel (engine.js:551)
//     at matMul_ (mat_mul.js:54)
//     at matMul__op (operation.js:51)
// Vv @ util_base.js:153
// QJ @ BatchMatMul_impl.js:76
// kernelFunc @ BatchMatMul.js:32
// n @ engine.js:644
// (anonym) @ engine.js:711
// t.scopedRun @ engine.js:478
// t.runKernelFunc @ engine.js:707
// t.runKernel @ engine.js:551
// matMul_ @ mat_mul.js:54
// matMul__op @ operation.js:51
// Kw.matMul @ mat_mul.js:33
// (anonym) @ VM4453:1

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2.transpose()).print()

// operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (undefined) of Tensors with shapes 4,2 and 2 and transposeA=false and transposeB=false must match.
//     at Vv (util_base.js:153)
//     at QJ (BatchMatMul_impl.js:76)
//     at Object.kernelFunc (BatchMatMul.js:32)
//     at n (engine.js:644)
//     at engine.js:711
//     at e.t.scopedRun (engine.js:478)
//     at e.t.runKernelFunc (engine.js:707)
//     at e.t.runKernel (engine.js:551)
//     at matMul_ (mat_mul.js:54)
//     at matMul__op (operation.js:51)
// Vv @ util_base.js:153
// QJ @ BatchMatMul_impl.js:76
// kernelFunc @ BatchMatMul.js:32
// n @ engine.js:644
// (anonym) @ engine.js:711
// t.scopedRun @ engine.js:478
// t.runKernelFunc @ engine.js:707
// t.runKernel @ engine.js:551
// matMul_ @ mat_mul.js:54
// matMul__op @ operation.js:51
// Kw.matMul @ mat_mul.js:33
// (anonym) @ VM4477:1

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2).print()

//operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (undefined) of Tensors with shapes 4,2 and 2 and transposeA=false and transposeB=false must match.
//    at Vv (util_base.js:153)
//    at QJ (BatchMatMul_impl.js:76)
//    at Object.kernelFunc (BatchMatMul.js:32)
//    at n (engine.js:644)
//    at engine.js:711
//    at e.t.scopedRun (engine.js:478)
//    at e.t.runKernelFunc (engine.js:707)
//    at e.t.runKernel (engine.js:551)
//    at matMul_ (mat_mul.js:54)
//    at matMul__op (operation.js:51)
//Vv @ util_base.js:153
//QJ @ BatchMatMul_impl.js:76
//kernelFunc @ BatchMatMul.js:32
//n @ engine.js:644
//(anonym) @ engine.js:711
//t.scopedRun @ engine.js:478
//t.runKernelFunc @ engine.js:707
//t.runKernel @ engine.js:551
//matMul_ @ mat_mul.js:54
//matMul__op @ operation.js:51
//Kw.matMul @ mat_mul.js:33
//(anonym) @ VM4502:1

let weights2 = tf.tensor1d([1,-2], 'int32', [2,1])

weights2.print()

//Tensor
//    [1, -2]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2).print()

// operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (undefined) of Tensors with shapes 4,2 and 2 and transposeA=false and transposeB=false must match.
//     at Vv (util_base.js:153)
//     at QJ (BatchMatMul_impl.js:76)
//     at Object.kernelFunc (BatchMatMul.js:32)
//     at n (engine.js:644)
//     at engine.js:711
//     at e.t.scopedRun (engine.js:478)
//     at e.t.runKernelFunc (engine.js:707)
//     at e.t.runKernel (engine.js:551)
//     at matMul_ (mat_mul.js:54)
//     at matMul__op (operation.js:51)
// Vv @ util_base.js:153
// QJ @ BatchMatMul_impl.js:76
// kernelFunc @ BatchMatMul.js:32
// n @ engine.js:644
// (anonym) @ engine.js:711
// t.scopedRun @ engine.js:478
// t.runKernelFunc @ engine.js:707
// t.runKernel @ engine.js:551
// matMul_ @ mat_mul.js:54
// matMul__op @ operation.js:51
// Kw.matMul @ mat_mul.js:33
// (anonym) @ VM4565:1
// xorInput.matMul(weights).relu().add(bias).relu().shape()
// VM4616:1 Uncaught TypeError: xorInput.matMul(...).relu(...).add(...).relu(...).shape is not a function
//     at <anonymous>:1:50
// (anonym) @ VM4616:1

xorInput.matMul(weights).relu().add(bias).relu().shape

// (2) [4, 2]

xorInput.matMul(weights).relu().add(bias).relu()

//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 8, …}

xorInput.matMul(weights).relu().add(bias).relu().print()

//Tensor
//    [[0, 0],
//     [1, 0],
//     [1, 0],
//     [2, 1]]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2)

// operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (undefined) of Tensors with shapes 4,2 and 2 and transposeA=false and transposeB=false must match.
//     at Vv (util_base.js:153)
//     at QJ (BatchMatMul_impl.js:76)
//     at Object.kernelFunc (BatchMatMul.js:32)
//     at n (engine.js:644)
//     at engine.js:711
//     at e.t.scopedRun (engine.js:478)
//     at e.t.runKernelFunc (engine.js:707)
//     at e.t.runKernel (engine.js:551)
//     at matMul_ (mat_mul.js:54)
//     at matMul__op (operation.js:51)
// Vv @ util_base.js:153
// QJ @ BatchMatMul_impl.js:76
// kernelFunc @ BatchMatMul.js:32
// n @ engine.js:644
// (anonym) @ engine.js:711
// t.scopedRun @ engine.js:478
// t.runKernelFunc @ engine.js:707
// t.runKernel @ engine.js:551
// matMul_ @ mat_mul.js:54
// matMul__op @ operation.js:51
// Kw.matMul @ mat_mul.js:33
// (anonym) @ VM4770:1

weights2.shape

// [2]0: 2length: 1[[Prototype]]: Array(0)

weights2 = tf.tensor2d([0,-1], [2,1])

// e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 2, …}

weights2.print()
//Tensor
//    [[0 ],
//     [-1]]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2)

//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 4, …}

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2).print()

//Tensor
//    [[0 ],
//     [0 ],
//     [0 ],
//     [-1]]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2.transpose()).print()

// operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (1) of Tensors with shapes 4,2 and 1,2 and transposeA=false and transposeB=false must match.
//     at Vv (util_base.js:153)
//     at QJ (BatchMatMul_impl.js:76)
//     at Object.kernelFunc (BatchMatMul.js:32)
//     at n (engine.js:644)
//     at engine.js:711
//     at e.t.scopedRun (engine.js:478)
//     at e.t.runKernelFunc (engine.js:707)
//     at e.t.runKernel (engine.js:551)
//     at matMul_ (mat_mul.js:54)
//     at matMul__op (operation.js:51)
// Vv @ util_base.js:153
// QJ @ BatchMatMul_impl.js:76
// kernelFunc @ BatchMatMul.js:32
// n @ engine.js:644
// (anonym) @ engine.js:711
// t.scopedRun @ engine.js:478
// t.runKernelFunc @ engine.js:707
// t.runKernel @ engine.js:551
// matMul_ @ mat_mul.js:54
// matMul__op @ operation.js:51
// Kw.matMul @ mat_mul.js:33
// (anonym) @ VM5040:1

weights2 = tf.tensor2d([0,-1], [1,2])

// e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 2, …}

weights2.print()
//Tensor
//     [[0, -1],]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2.transpose()).print()

//Tensor
//    [[0 ],
//     [0 ],
//     [0 ],
//     [-1]]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2).print()

//operation.js:57 Uncaught Error: Error in matMul: inner shapes (2) and (1) of Tensors with shapes 4,2 and 1,2 and transposeA=false and transposeB=false must match.
//    at Vv (util_base.js:153)
//    at QJ (BatchMatMul_impl.js:76)
//    at Object.kernelFunc (BatchMatMul.js:32)
//    at n (engine.js:644)
//    at engine.js:711
//    at e.t.scopedRun (engine.js:478)
//    at e.t.runKernelFunc (engine.js:707)
//    at e.t.runKernel (engine.js:551)
//    at matMul_ (mat_mul.js:54)
//    at matMul__op (operation.js:51)
//Vv @ util_base.js:153
//QJ @ BatchMatMul_impl.js:76
//kernelFunc @ BatchMatMul.js:32
//n @ engine.js:644
//(anonym) @ engine.js:711
//t.scopedRun @ engine.js:478
//t.runKernelFunc @ engine.js:707
//t.runKernel @ engine.js:551
//matMul_ @ mat_mul.js:54
//matMul__op @ operation.js:51
//Kw.matMul @ mat_mul.js:33
//(anonym) @ VM5138:1
xorInput.matMul(weights).relu().add(bias).relu().print()
//Tensor
//    [[0, 0],
//     [1, 0],
//     [1, 0],
//     [2, 1]]

weights2 = tf.tensor2d([1,-2], [2,1])

//e {kept: false, isDisposedInternal: false, shape: Array(2), dtype: 'float32', size: 2, …}

xorInput.matMul(weights).relu().add(bias).relu().print()
//Tensor
//    [[0, 0],
//     [1, 0],
//     [1, 0],
//     [2, 1]]

xorInput.matMul(weights).relu().add(bias).relu().matMul(weights2).print()
//Tensor
//    [[0],
//     [1],
//     [1],
//     [0]]