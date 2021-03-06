/*global define*/
define([
        './Cartesian2',
        './defaultValue',
        './defined',
        './DeveloperError',
        './freezeObject'
    ], function(
        Cartesian2,
        defaultValue,
        defined,
        DeveloperError,
        freezeObject) {
    "use strict";

    /**
     * A 2x2 matrix, indexable as a column-major order array.
     * Constructor parameters are in row-major order for code readability.
     * @alias Matrix2
     * @constructor
     *
     * @param {Number} [column0Row0=0.0] The value for column 0, row 0.
     * @param {Number} [column1Row0=0.0] The value for column 1, row 0.
     * @param {Number} [column0Row1=0.0] The value for column 0, row 1.
     * @param {Number} [column1Row1=0.0] The value for column 1, row 1.
     *
     * @see Matrix2.fromColumnMajor
     * @see Matrix2.fromRowMajorArray
     * @see Matrix2.fromScale
     * @see Matrix2.fromUniformScale
     * @see Matrix3
     * @see Matrix4
     */
    var Matrix2 = function(column0Row0, column1Row0, column0Row1, column1Row1) {
        this[0] = defaultValue(column0Row0, 0.0);
        this[1] = defaultValue(column0Row1, 0.0);
        this[2] = defaultValue(column1Row0, 0.0);
        this[3] = defaultValue(column1Row1, 0.0);
    };

    /**
     * Duplicates a Matrix2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to duplicate.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided. (Returns undefined if matrix is undefined)
     */
    Matrix2.clone = function(values, result) {
        if (!defined(values)) {
            return undefined;
        }
        if (!defined(result)) {
            return new Matrix2(values[0], values[2],
                               values[1], values[3]);
        }
        result[0] = values[0];
        result[1] = values[1];
        result[2] = values[2];
        result[3] = values[3];
        return result;
    };

    /**
     * Creates a Matrix2 from 4 consecutive elements in an array.
     * @memberof Matrix2
     *
     * @param {Array} array The array whose 4 consecutive elements correspond to the positions of the matrix.  Assumes column-major order.
     * @param {Number} [startingIndex=0] The offset into the array of the first element, which corresponds to first column first row position in the matrix.
     * @param {Matrix2} [result] The object onto which to store the result.
     *
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     *
     * @example
     * // Create the Matrix2:
     * // [1.0, 2.0]
     * // [1.0, 2.0]
     *
     * var v = [1.0, 1.0, 2.0, 2.0];
     * var m = Cesium.Matrix2.fromArray(v);
     *
     * // Create same Matrix2 with using an offset into an array
     * var v2 = [0.0, 0.0, 1.0, 1.0, 2.0, 2.0];
     * var m2 = Cesium.Matrix2.fromArray(v2, 2);
     */
    Matrix2.fromArray = function(array, startingIndex, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(array)) {
            throw new DeveloperError('array is required');
        }
        //>>includeEnd('debug');

        startingIndex = defaultValue(startingIndex, 0);

        if (!defined(result)) {
            result = new Matrix2();
        }

        result[0] = array[startingIndex];
        result[1] = array[startingIndex + 1];
        result[2] = array[startingIndex + 2];
        result[3] = array[startingIndex + 3];
        return result;
    };

    /**
     * Creates a Matrix2 instance from a column-major order array.
     * @memberof Matrix2
     * @function
     *
     * @param {Array} values The column-major order array.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     */
    Matrix2.fromColumnMajorArray = function(values, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(values)) {
            throw new DeveloperError('values parameter is required');
        }
        //>>includeEnd('debug');

        return Matrix2.clone(values, result);
    };

    /**
     * Creates a Matrix2 instance from a row-major order array.
     * The resulting matrix will be in column-major order.
     * @memberof Matrix2
     *
     * @param {Array} values The row-major order array.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     */
    Matrix2.fromRowMajorArray = function(values, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(values)) {
            throw new DeveloperError('values is required.');
        }
        //>>includeEnd('debug');

        if (!defined(result)) {
            return new Matrix2(values[0], values[1],
                               values[2], values[3]);
        }
        result[0] = values[0];
        result[1] = values[2];
        result[2] = values[1];
        result[3] = values[3];
        return result;
    };

    /**
     * Computes a Matrix2 instance representing a non-uniform scale.
     * @memberof Matrix2
     *
     * @param {Cartesian2} scale The x and y scale factors.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     *
     * @example
     * // Creates
     * //   [7.0, 0.0]
     * //   [0.0, 8.0]
     * var m = Cesium.Matrix2.fromScale(new Cesium.Cartesian2(7.0, 8.0));
     */
    Matrix2.fromScale = function(scale, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(scale)) {
            throw new DeveloperError('scale is required.');
        }
        //>>includeEnd('debug');

        if (!defined(result)) {
            return new Matrix2(
                scale.x, 0.0,
                0.0,     scale.y);
        }

        result[0] = scale.x;
        result[1] = 0.0;
        result[2] = 0.0;
        result[3] = scale.y;
        return result;
    };

    /**
     * Computes a Matrix2 instance representing a uniform scale.
     * @memberof Matrix2
     *
     * @param {Number} scale The uniform scale factor.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     *
     * @example
     * // Creates
     * //   [2.0, 0.0]
     * //   [0.0, 2.0]
     * var m = Cesium.Matrix2.fromUniformScale(2.0);
     */
    Matrix2.fromUniformScale = function(scale, result) {
        //>>includeStart('debug', pragmas.debug);
        if (typeof scale !== 'number') {
            throw new DeveloperError('scale is required.');
        }
        //>>includeEnd('debug');

        if (!defined(result)) {
            return new Matrix2(
                scale, 0.0,
                0.0,   scale);
        }

        result[0] = scale;
        result[1] = 0.0;
        result[2] = 0.0;
        result[3] = scale;
        return result;
    };

    /**
     * Creates a rotation matrix.
     *
     * @param {Number} angle The angle, in radians, of the rotation.  Positive angles are counterclockwise.
     * @param {Matrix2} [result] The object in which the result will be stored, if undefined a new instance will be created.
     *
     * @returns The modified result parameter, or a new Matrix2 instance if one was not provided.
     *
     * @example
     * // Rotate a point 45 degrees counterclockwise.
     * var p = new Cesium.Cartesian2(5, 6);
     * var m = Cesium.Matrix2.fromRotation(Cesium.Math.toRadians(45.0));
     * var rotated = Cesium.Matrix2.multiplyByVector(m, p);
     */
    Matrix2.fromRotation = function(angle, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(angle)) {
            throw new DeveloperError('angle is required.');
        }
        //>>includeEnd('debug');

        var cosAngle = Math.cos(angle);
        var sinAngle = Math.sin(angle);

        if (!defined(result)) {
            return new Matrix2(
                cosAngle, -sinAngle,
                sinAngle, cosAngle);
        }
        result[0] = cosAngle;
        result[1] = sinAngle;
        result[2] = -sinAngle;
        result[3] = cosAngle;
        return result;
    };

    /**
     * Creates an Array from the provided Matrix2 instance.
     * The array will be in column-major order.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use..
     * @param {Array} [result] The Array onto which to store the result.
     * @returns {Array} The modified Array parameter or a new Array instance if one was not provided.
     */
    Matrix2.toArray = function(matrix, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required');
        }
        //>>includeEnd('debug');

        if (!defined(result)) {
            return [matrix[0], matrix[1], matrix[2], matrix[3]];
        }
        result[0] = matrix[0];
        result[1] = matrix[1];
        result[2] = matrix[2];
        result[3] = matrix[3];
        return result;
    };

    /**
     * Computes the array index of the element at the provided row and column.
     * @memberof Matrix2
     *
     * @param {Number} row The zero-based index of the row.
     * @param {Number} column The zero-based index of the column.
     * @returns {Number} The index of the element at the provided row and column.
     *
     * @exception {DeveloperError} row must be 0 or 1.
     * @exception {DeveloperError} column must be 0 or 1.
     *
     * @example
     * var myMatrix = new Cesium.Matrix2();
     * var column1Row0Index = Cesium.Matrix2.getElementIndex(1, 0);
     * var column1Row0 = myMatrix[column1Row0Index]
     * myMatrix[column1Row0Index] = 10.0;
     */
    Matrix2.getElementIndex = function(column, row) {
        //>>includeStart('debug', pragmas.debug);
        if (typeof row !== 'number' || row < 0 || row > 1) {
            throw new DeveloperError('row must be 0 or 1.');
        }
        if (typeof column !== 'number' || column < 0 || column > 1) {
            throw new DeveloperError('column must be 0 or 1.');
        }
        //>>includeEnd('debug');

        return column * 2 + row;
    };

    /**
     * Retrieves a copy of the matrix column at the provided index as a Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to retrieve.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
     *
     * @exception {DeveloperError} index must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.getColumn = function(matrix, index, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required.');
        }

        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index must be 0 or 1.');
        }
        //>>includeEnd('debug');

        var startIndex = index * 2;
        var x = matrix[startIndex];
        var y = matrix[startIndex + 1];

        if (!defined(result)) {
            return new Cartesian2(x, y);
        }
        result.x = x;
        result.y = y;
        return result;
    };

    /**
     * Computes a new matrix that replaces the specified column in the provided matrix with the provided Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use.
     * @param {Number} index The zero-based index of the column to set.
     * @param {Cartesian2} cartesian The Cartesian whose values will be assigned to the specified column.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     *
     * @exception {DeveloperError} index must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.setColumn = function(matrix, index, cartesian, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required');
        }
        if (!defined(cartesian)) {
            throw new DeveloperError('cartesian is required');
        }
        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index must be 0 or 1.');
        }
        //>>includeEnd('debug');

        result = Matrix2.clone(matrix, result);
        var startIndex = index * 2;
        result[startIndex] = cartesian.x;
        result[startIndex + 1] = cartesian.y;
        return result;
    };

    /**
     * Retrieves a copy of the matrix row at the provided index as a Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to retrieve.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
     *
     * @exception {DeveloperError} index must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.getRow = function(matrix, index, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required.');
        }

        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index must be 0 or 1.');
        }
        //>>includeEnd('debug');

        var x = matrix[index];
        var y = matrix[index + 2];

        if (!defined(result)) {
            return new Cartesian2(x, y);
        }
        result.x = x;
        result.y = y;
        return result;
    };

    /**
     * Computes a new matrix that replaces the specified row in the provided matrix with the provided Cartesian2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to use.
     * @param {Number} index The zero-based index of the row to set.
     * @param {Cartesian2} cartesian The Cartesian whose values will be assigned to the specified row.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     *
     * @exception {DeveloperError} index must be 0 or 1.
     *
     * @see Cartesian2
     */
    Matrix2.setRow = function(matrix, index, cartesian, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required');
        }
        if (!defined(cartesian)) {
            throw new DeveloperError('cartesian is required');
        }
        if (typeof index !== 'number' || index < 0 || index > 1) {
            throw new DeveloperError('index must be 0 or 1.');
        }
        //>>includeEnd('debug');

        result = Matrix2.clone(matrix, result);
        result[index] = cartesian.x;
        result[index + 2] = cartesian.y;
        return result;
    };

    /**
     * Computes the product of two matrices.
     * @memberof Matrix2
     *
     * @param {Matrix2} left The first matrix.
     * @param {Matrix2} right The second matrix.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    Matrix2.multiply = function(left, right, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(left)) {
            throw new DeveloperError('left is required');
        }
        if (!defined(right)) {
            throw new DeveloperError('right is required');
        }
        //>>includeEnd('debug');

        var column0Row0 = left[0] * right[0] + left[2] * right[1];
        var column1Row0 = left[0] * right[2] + left[2] * right[3];
        var column0Row1 = left[1] * right[0] + left[3] * right[1];
        var column1Row1 = left[1] * right[2] + left[3] * right[3];

        if (!defined(result)) {
            return new Matrix2(column0Row0, column1Row0,
                               column0Row1, column1Row1);
        }
        result[0] = column0Row0;
        result[1] = column0Row1;
        result[2] = column1Row0;
        result[3] = column1Row1;
        return result;
    };

    /**
     * Computes the product of a matrix and a column vector.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix.
     * @param {Cartesian2} cartesian The column.
     * @param {Cartesian2} [result] The object onto which to store the result.
     * @returns {Cartesian2} The modified result parameter or a new Cartesian2 instance if one was not provided.
     */
    Matrix2.multiplyByVector = function(matrix, cartesian, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required');
        }
        if (!defined(cartesian)) {
            throw new DeveloperError('cartesian is required');
        }
        //>>includeEnd('debug');

        var x = matrix[0] * cartesian.x + matrix[2] * cartesian.y;
        var y = matrix[1] * cartesian.x + matrix[3] * cartesian.y;

        if (!defined(result)) {
            return new Cartesian2(x, y);
        }
        result.x = x;
        result.y = y;
        return result;
    };

    /**
     * Computes the product of a matrix and a scalar.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix.
     * @param {Number} scalar The number to multiply by.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Cartesian2 instance if one was not provided.
     */
    Matrix2.multiplyByScalar = function(matrix, scalar, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required');
        }
        if (typeof scalar !== 'number') {
            throw new DeveloperError('scalar is required and must be a number');
        }
        //>>includeEnd('debug');

        if (!defined(result)) {
            return new Matrix2(matrix[0] * scalar, matrix[2] * scalar,
                               matrix[1] * scalar, matrix[3] * scalar);
        }
        result[0] = matrix[0] * scalar;
        result[1] = matrix[1] * scalar;
        result[2] = matrix[2] * scalar;
        result[3] = matrix[3] * scalar;
        return result;
    };

    /**
     * Creates a negated copy of the provided matrix.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to negate.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    Matrix2.negate = function(matrix, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required');
        }
        //>>includeEnd('debug');

        if (!defined(result)) {
            return new Matrix2(-matrix[0], -matrix[2],
                               -matrix[1], -matrix[3]);
        }
        result[0] = -matrix[0];
        result[1] = -matrix[1];
        result[2] = -matrix[2];
        result[3] = -matrix[3];
        return result;
    };

    /**
     * Computes the transpose of the provided matrix.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix to transpose.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    Matrix2.transpose = function(matrix, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required');
        }
        //>>includeEnd('debug');

        var column0Row0 = matrix[0];
        var column0Row1 = matrix[2];
        var column1Row0 = matrix[1];
        var column1Row1 = matrix[3];

        if (!defined(result)) {
            return new Matrix2(column0Row0, column1Row0,
                               column0Row1, column1Row1);
        }
        result[0] = column0Row0;
        result[1] = column0Row1;
        result[2] = column1Row0;
        result[3] = column1Row1;
        return result;
    };

    /**
     * Computes a matrix, which contains the absolute (unsigned) values of the provided matrix's elements.
     * @memberof Matrix2
     *
     * @param {Matrix2} matrix The matrix with signed elements.
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    Matrix2.abs = function(matrix, result) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(matrix)) {
            throw new DeveloperError('matrix is required');
        }
        //>>includeEnd('debug');

        if (!defined(result)) {
            return new Matrix2(Math.abs(matrix[0]), Math.abs(matrix[2]),
                               Math.abs(matrix[1]), Math.abs(matrix[3]));
        }
        result[0] = Math.abs(matrix[0]);
        result[1] = Math.abs(matrix[1]);
        result[2] = Math.abs(matrix[2]);
        result[3] = Math.abs(matrix[3]);

        return result;
    };

    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @memberof Matrix2
     *
     * @param {Matrix2} [left] The first matrix.
     * @param {Matrix2} [right] The second matrix.
     * @returns {Boolean} <code>true</code> if left and right are equal, <code>false</code> otherwise.
     */
    Matrix2.equals = function(left, right) {
        return (left === right) ||
               (defined(left) &&
                defined(right) &&
                left[0] === right[0] &&
                left[1] === right[1] &&
                left[2] === right[2] &&
                left[3] === right[3]);
    };

    /**
     * Compares the provided matrices componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @memberof Matrix2
     *
     * @param {Matrix2} [left] The first matrix.
     * @param {Matrix2} [right] The second matrix.
     * @param {Number} epsilon The epsilon to use for equality testing.
     * @returns {Boolean} <code>true</code> if left and right are within the provided epsilon, <code>false</code> otherwise.
     */
    Matrix2.equalsEpsilon = function(left, right, epsilon) {
        //>>includeStart('debug', pragmas.debug);
        if (typeof epsilon !== 'number') {
            throw new DeveloperError('epsilon must be a number');
        }
        //>>includeEnd('debug');

        return (left === right) ||
                (defined(left) &&
                defined(right) &&
                Math.abs(left[0] - right[0]) <= epsilon &&
                Math.abs(left[1] - right[1]) <= epsilon &&
                Math.abs(left[2] - right[2]) <= epsilon &&
                Math.abs(left[3] - right[3]) <= epsilon);
    };

    /**
     * An immutable Matrix2 instance initialized to the identity matrix.
     * @memberof Matrix2
     */
    Matrix2.IDENTITY = freezeObject(new Matrix2(1.0, 0.0,
                                                0.0, 1.0));

    /**
     * The index into Matrix2 for column 0, row 0.
     * @memberof Matrix2
     *
     * @example
     * var matrix = new Cesium.Matrix2();
     * matrix[Matrix2.COLUMN0ROW0] = 5.0; //set column 0, row 0 to 5.0
     */
    Matrix2.COLUMN0ROW0 = 0;

    /**
     * The index into Matrix2 for column 0, row 1.
     * @memberof Matrix2
     *
     * @example
     * var matrix = new Cesium.Matrix2();
     * matrix[Matrix2.COLUMN0ROW1] = 5.0; //set column 0, row 1 to 5.0
     */
    Matrix2.COLUMN0ROW1 = 1;

    /**
     * The index into Matrix2 for column 1, row 0.
     * @memberof Matrix2
     *
     * @example
     * var matrix = new Cesium.Matrix2();
     * matrix[Matrix2.COLUMN1ROW0] = 5.0; //set column 1, row 0 to 5.0
     */
    Matrix2.COLUMN1ROW0 = 2;

    /**
     * The index into Matrix2 for column 1, row 1.
     * @memberof Matrix2
     *
     * @example
     * var matrix = new Cesium.Matrix2();
     * matrix[Matrix2.COLUMN1ROW1] = 5.0; //set column 1, row 1 to 5.0
     */
    Matrix2.COLUMN1ROW1 = 3;

    /**
     * Duplicates the provided Matrix2 instance.
     * @memberof Matrix2
     *
     * @param {Matrix2} [result] The object onto which to store the result.
     * @returns {Matrix2} The modified result parameter or a new Matrix2 instance if one was not provided.
     */
    Matrix2.prototype.clone = function(result) {
        return Matrix2.clone(this, result);
    };

    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are equal, <code>false</code> otherwise.
     * @memberof Matrix2
     *
     * @param {Matrix2} [right] The right hand side matrix.
     * @returns {Boolean} <code>true</code> if they are equal, <code>false</code> otherwise.
     */
    Matrix2.prototype.equals = function(right) {
        return Matrix2.equals(this, right);
    };

    /**
     * Compares this matrix to the provided matrix componentwise and returns
     * <code>true</code> if they are within the provided epsilon,
     * <code>false</code> otherwise.
     * @memberof Matrix2
     *
     * @param {Matrix2} [right] The right hand side matrix.
     * @param {Number} epsilon The epsilon to use for equality testing.
     * @returns {Boolean} <code>true</code> if they are within the provided epsilon, <code>false</code> otherwise.
     */
    Matrix2.prototype.equalsEpsilon = function(right, epsilon) {
        return Matrix2.equalsEpsilon(this, right, epsilon);
    };

    /**
     * Creates a string representing this Matrix with each row being
     * on a separate line and in the format '(column0, column1)'.
     * @memberof Matrix2
     *
     * @returns {String} A string representing the provided Matrix with each row being on a separate line and in the format '(column0, column1)'.
     */
    Matrix2.prototype.toString = function() {
        return '(' + this[0] + ', ' + this[2] + ')\n' +
               '(' + this[1] + ', ' + this[3] + ')';
    };

    return Matrix2;
});
