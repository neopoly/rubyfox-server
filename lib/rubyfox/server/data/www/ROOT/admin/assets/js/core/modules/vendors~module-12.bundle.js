/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["vendors~module-12"],{

/***/ "./node_modules/aes-js/index.js":
/*!**************************************!*\
  !*** ./node_modules/aes-js/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*! MIT License. Copyright 2015-2018 Richard Moore <me@ricmoo.com>. See LICENSE.txt. */
(function(root) {
    "use strict";

    function checkInt(value) {
        return (parseInt(value) === value);
    }

    function checkInts(arrayish) {
        if (!checkInt(arrayish.length)) { return false; }

        for (var i = 0; i < arrayish.length; i++) {
            if (!checkInt(arrayish[i]) || arrayish[i] < 0 || arrayish[i] > 255) {
                return false;
            }
        }

        return true;
    }

    function coerceArray(arg, copy) {

        // ArrayBuffer view
        if (arg.buffer && arg.name === 'Uint8Array') {

            if (copy) {
                if (arg.slice) {
                    arg = arg.slice();
                } else {
                    arg = Array.prototype.slice.call(arg);
                }
            }

            return arg;
        }

        // It's an array; check it is a valid representation of a byte
        if (Array.isArray(arg)) {
            if (!checkInts(arg)) {
                throw new Error('Array contains invalid value: ' + arg);
            }

            return new Uint8Array(arg);
        }

        // Something else, but behaves like an array (maybe a Buffer? Arguments?)
        if (checkInt(arg.length) && checkInts(arg)) {
            return new Uint8Array(arg);
        }

        throw new Error('unsupported array-like object');
    }

    function createArray(length) {
        return new Uint8Array(length);
    }

    function copyArray(sourceArray, targetArray, targetStart, sourceStart, sourceEnd) {
        if (sourceStart != null || sourceEnd != null) {
            if (sourceArray.slice) {
                sourceArray = sourceArray.slice(sourceStart, sourceEnd);
            } else {
                sourceArray = Array.prototype.slice.call(sourceArray, sourceStart, sourceEnd);
            }
        }
        targetArray.set(sourceArray, targetStart);
    }



    var convertUtf8 = (function() {
        function toBytes(text) {
            var result = [], i = 0;
            text = encodeURI(text);
            while (i < text.length) {
                var c = text.charCodeAt(i++);

                // if it is a % sign, encode the following 2 bytes as a hex value
                if (c === 37) {
                    result.push(parseInt(text.substr(i, 2), 16))
                    i += 2;

                // otherwise, just the actual byte
                } else {
                    result.push(c)
                }
            }

            return coerceArray(result);
        }

        function fromBytes(bytes) {
            var result = [], i = 0;

            while (i < bytes.length) {
                var c = bytes[i];

                if (c < 128) {
                    result.push(String.fromCharCode(c));
                    i++;
                } else if (c > 191 && c < 224) {
                    result.push(String.fromCharCode(((c & 0x1f) << 6) | (bytes[i + 1] & 0x3f)));
                    i += 2;
                } else {
                    result.push(String.fromCharCode(((c & 0x0f) << 12) | ((bytes[i + 1] & 0x3f) << 6) | (bytes[i + 2] & 0x3f)));
                    i += 3;
                }
            }

            return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();

    var convertHex = (function() {
        function toBytes(text) {
            var result = [];
            for (var i = 0; i < text.length; i += 2) {
                result.push(parseInt(text.substr(i, 2), 16));
            }

            return result;
        }

        // http://ixti.net/development/javascript/2011/11/11/base64-encodedecode-of-utf8-in-browser-with-js.html
        var Hex = '0123456789abcdef';

        function fromBytes(bytes) {
                var result = [];
                for (var i = 0; i < bytes.length; i++) {
                    var v = bytes[i];
                    result.push(Hex[(v & 0xf0) >> 4] + Hex[v & 0x0f]);
                }
                return result.join('');
        }

        return {
            toBytes: toBytes,
            fromBytes: fromBytes,
        }
    })();


    // Number of rounds by keysize
    var numberOfRounds = {16: 10, 24: 12, 32: 14}

    // Round constant words
    var rcon = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5, 0x91];

    // S-box and Inverse S-box (S is for Substitution)
    var S = [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76, 0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0, 0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15, 0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75, 0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84, 0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf, 0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8, 0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2, 0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73, 0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb, 0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79, 0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08, 0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a, 0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e, 0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf, 0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16];
    var Si =[0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d];

    // Transformations for encryption
    var T1 = [0xc66363a5, 0xf87c7c84, 0xee777799, 0xf67b7b8d, 0xfff2f20d, 0xd66b6bbd, 0xde6f6fb1, 0x91c5c554, 0x60303050, 0x02010103, 0xce6767a9, 0x562b2b7d, 0xe7fefe19, 0xb5d7d762, 0x4dababe6, 0xec76769a, 0x8fcaca45, 0x1f82829d, 0x89c9c940, 0xfa7d7d87, 0xeffafa15, 0xb25959eb, 0x8e4747c9, 0xfbf0f00b, 0x41adadec, 0xb3d4d467, 0x5fa2a2fd, 0x45afafea, 0x239c9cbf, 0x53a4a4f7, 0xe4727296, 0x9bc0c05b, 0x75b7b7c2, 0xe1fdfd1c, 0x3d9393ae, 0x4c26266a, 0x6c36365a, 0x7e3f3f41, 0xf5f7f702, 0x83cccc4f, 0x6834345c, 0x51a5a5f4, 0xd1e5e534, 0xf9f1f108, 0xe2717193, 0xabd8d873, 0x62313153, 0x2a15153f, 0x0804040c, 0x95c7c752, 0x46232365, 0x9dc3c35e, 0x30181828, 0x379696a1, 0x0a05050f, 0x2f9a9ab5, 0x0e070709, 0x24121236, 0x1b80809b, 0xdfe2e23d, 0xcdebeb26, 0x4e272769, 0x7fb2b2cd, 0xea75759f, 0x1209091b, 0x1d83839e, 0x582c2c74, 0x341a1a2e, 0x361b1b2d, 0xdc6e6eb2, 0xb45a5aee, 0x5ba0a0fb, 0xa45252f6, 0x763b3b4d, 0xb7d6d661, 0x7db3b3ce, 0x5229297b, 0xdde3e33e, 0x5e2f2f71, 0x13848497, 0xa65353f5, 0xb9d1d168, 0x00000000, 0xc1eded2c, 0x40202060, 0xe3fcfc1f, 0x79b1b1c8, 0xb65b5bed, 0xd46a6abe, 0x8dcbcb46, 0x67bebed9, 0x7239394b, 0x944a4ade, 0x984c4cd4, 0xb05858e8, 0x85cfcf4a, 0xbbd0d06b, 0xc5efef2a, 0x4faaaae5, 0xedfbfb16, 0x864343c5, 0x9a4d4dd7, 0x66333355, 0x11858594, 0x8a4545cf, 0xe9f9f910, 0x04020206, 0xfe7f7f81, 0xa05050f0, 0x783c3c44, 0x259f9fba, 0x4ba8a8e3, 0xa25151f3, 0x5da3a3fe, 0x804040c0, 0x058f8f8a, 0x3f9292ad, 0x219d9dbc, 0x70383848, 0xf1f5f504, 0x63bcbcdf, 0x77b6b6c1, 0xafdada75, 0x42212163, 0x20101030, 0xe5ffff1a, 0xfdf3f30e, 0xbfd2d26d, 0x81cdcd4c, 0x180c0c14, 0x26131335, 0xc3ecec2f, 0xbe5f5fe1, 0x359797a2, 0x884444cc, 0x2e171739, 0x93c4c457, 0x55a7a7f2, 0xfc7e7e82, 0x7a3d3d47, 0xc86464ac, 0xba5d5de7, 0x3219192b, 0xe6737395, 0xc06060a0, 0x19818198, 0x9e4f4fd1, 0xa3dcdc7f, 0x44222266, 0x542a2a7e, 0x3b9090ab, 0x0b888883, 0x8c4646ca, 0xc7eeee29, 0x6bb8b8d3, 0x2814143c, 0xa7dede79, 0xbc5e5ee2, 0x160b0b1d, 0xaddbdb76, 0xdbe0e03b, 0x64323256, 0x743a3a4e, 0x140a0a1e, 0x924949db, 0x0c06060a, 0x4824246c, 0xb85c5ce4, 0x9fc2c25d, 0xbdd3d36e, 0x43acacef, 0xc46262a6, 0x399191a8, 0x319595a4, 0xd3e4e437, 0xf279798b, 0xd5e7e732, 0x8bc8c843, 0x6e373759, 0xda6d6db7, 0x018d8d8c, 0xb1d5d564, 0x9c4e4ed2, 0x49a9a9e0, 0xd86c6cb4, 0xac5656fa, 0xf3f4f407, 0xcfeaea25, 0xca6565af, 0xf47a7a8e, 0x47aeaee9, 0x10080818, 0x6fbabad5, 0xf0787888, 0x4a25256f, 0x5c2e2e72, 0x381c1c24, 0x57a6a6f1, 0x73b4b4c7, 0x97c6c651, 0xcbe8e823, 0xa1dddd7c, 0xe874749c, 0x3e1f1f21, 0x964b4bdd, 0x61bdbddc, 0x0d8b8b86, 0x0f8a8a85, 0xe0707090, 0x7c3e3e42, 0x71b5b5c4, 0xcc6666aa, 0x904848d8, 0x06030305, 0xf7f6f601, 0x1c0e0e12, 0xc26161a3, 0x6a35355f, 0xae5757f9, 0x69b9b9d0, 0x17868691, 0x99c1c158, 0x3a1d1d27, 0x279e9eb9, 0xd9e1e138, 0xebf8f813, 0x2b9898b3, 0x22111133, 0xd26969bb, 0xa9d9d970, 0x078e8e89, 0x339494a7, 0x2d9b9bb6, 0x3c1e1e22, 0x15878792, 0xc9e9e920, 0x87cece49, 0xaa5555ff, 0x50282878, 0xa5dfdf7a, 0x038c8c8f, 0x59a1a1f8, 0x09898980, 0x1a0d0d17, 0x65bfbfda, 0xd7e6e631, 0x844242c6, 0xd06868b8, 0x824141c3, 0x299999b0, 0x5a2d2d77, 0x1e0f0f11, 0x7bb0b0cb, 0xa85454fc, 0x6dbbbbd6, 0x2c16163a];
    var T2 = [0xa5c66363, 0x84f87c7c, 0x99ee7777, 0x8df67b7b, 0x0dfff2f2, 0xbdd66b6b, 0xb1de6f6f, 0x5491c5c5, 0x50603030, 0x03020101, 0xa9ce6767, 0x7d562b2b, 0x19e7fefe, 0x62b5d7d7, 0xe64dabab, 0x9aec7676, 0x458fcaca, 0x9d1f8282, 0x4089c9c9, 0x87fa7d7d, 0x15effafa, 0xebb25959, 0xc98e4747, 0x0bfbf0f0, 0xec41adad, 0x67b3d4d4, 0xfd5fa2a2, 0xea45afaf, 0xbf239c9c, 0xf753a4a4, 0x96e47272, 0x5b9bc0c0, 0xc275b7b7, 0x1ce1fdfd, 0xae3d9393, 0x6a4c2626, 0x5a6c3636, 0x417e3f3f, 0x02f5f7f7, 0x4f83cccc, 0x5c683434, 0xf451a5a5, 0x34d1e5e5, 0x08f9f1f1, 0x93e27171, 0x73abd8d8, 0x53623131, 0x3f2a1515, 0x0c080404, 0x5295c7c7, 0x65462323, 0x5e9dc3c3, 0x28301818, 0xa1379696, 0x0f0a0505, 0xb52f9a9a, 0x090e0707, 0x36241212, 0x9b1b8080, 0x3ddfe2e2, 0x26cdebeb, 0x694e2727, 0xcd7fb2b2, 0x9fea7575, 0x1b120909, 0x9e1d8383, 0x74582c2c, 0x2e341a1a, 0x2d361b1b, 0xb2dc6e6e, 0xeeb45a5a, 0xfb5ba0a0, 0xf6a45252, 0x4d763b3b, 0x61b7d6d6, 0xce7db3b3, 0x7b522929, 0x3edde3e3, 0x715e2f2f, 0x97138484, 0xf5a65353, 0x68b9d1d1, 0x00000000, 0x2cc1eded, 0x60402020, 0x1fe3fcfc, 0xc879b1b1, 0xedb65b5b, 0xbed46a6a, 0x468dcbcb, 0xd967bebe, 0x4b723939, 0xde944a4a, 0xd4984c4c, 0xe8b05858, 0x4a85cfcf, 0x6bbbd0d0, 0x2ac5efef, 0xe54faaaa, 0x16edfbfb, 0xc5864343, 0xd79a4d4d, 0x55663333, 0x94118585, 0xcf8a4545, 0x10e9f9f9, 0x06040202, 0x81fe7f7f, 0xf0a05050, 0x44783c3c, 0xba259f9f, 0xe34ba8a8, 0xf3a25151, 0xfe5da3a3, 0xc0804040, 0x8a058f8f, 0xad3f9292, 0xbc219d9d, 0x48703838, 0x04f1f5f5, 0xdf63bcbc, 0xc177b6b6, 0x75afdada, 0x63422121, 0x30201010, 0x1ae5ffff, 0x0efdf3f3, 0x6dbfd2d2, 0x4c81cdcd, 0x14180c0c, 0x35261313, 0x2fc3ecec, 0xe1be5f5f, 0xa2359797, 0xcc884444, 0x392e1717, 0x5793c4c4, 0xf255a7a7, 0x82fc7e7e, 0x477a3d3d, 0xacc86464, 0xe7ba5d5d, 0x2b321919, 0x95e67373, 0xa0c06060, 0x98198181, 0xd19e4f4f, 0x7fa3dcdc, 0x66442222, 0x7e542a2a, 0xab3b9090, 0x830b8888, 0xca8c4646, 0x29c7eeee, 0xd36bb8b8, 0x3c281414, 0x79a7dede, 0xe2bc5e5e, 0x1d160b0b, 0x76addbdb, 0x3bdbe0e0, 0x56643232, 0x4e743a3a, 0x1e140a0a, 0xdb924949, 0x0a0c0606, 0x6c482424, 0xe4b85c5c, 0x5d9fc2c2, 0x6ebdd3d3, 0xef43acac, 0xa6c46262, 0xa8399191, 0xa4319595, 0x37d3e4e4, 0x8bf27979, 0x32d5e7e7, 0x438bc8c8, 0x596e3737, 0xb7da6d6d, 0x8c018d8d, 0x64b1d5d5, 0xd29c4e4e, 0xe049a9a9, 0xb4d86c6c, 0xfaac5656, 0x07f3f4f4, 0x25cfeaea, 0xafca6565, 0x8ef47a7a, 0xe947aeae, 0x18100808, 0xd56fbaba, 0x88f07878, 0x6f4a2525, 0x725c2e2e, 0x24381c1c, 0xf157a6a6, 0xc773b4b4, 0x5197c6c6, 0x23cbe8e8, 0x7ca1dddd, 0x9ce87474, 0x213e1f1f, 0xdd964b4b, 0xdc61bdbd, 0x860d8b8b, 0x850f8a8a, 0x90e07070, 0x427c3e3e, 0xc471b5b5, 0xaacc6666, 0xd8904848, 0x05060303, 0x01f7f6f6, 0x121c0e0e, 0xa3c26161, 0x5f6a3535, 0xf9ae5757, 0xd069b9b9, 0x91178686, 0x5899c1c1, 0x273a1d1d, 0xb9279e9e, 0x38d9e1e1, 0x13ebf8f8, 0xb32b9898, 0x33221111, 0xbbd26969, 0x70a9d9d9, 0x89078e8e, 0xa7339494, 0xb62d9b9b, 0x223c1e1e, 0x92158787, 0x20c9e9e9, 0x4987cece, 0xffaa5555, 0x78502828, 0x7aa5dfdf, 0x8f038c8c, 0xf859a1a1, 0x80098989, 0x171a0d0d, 0xda65bfbf, 0x31d7e6e6, 0xc6844242, 0xb8d06868, 0xc3824141, 0xb0299999, 0x775a2d2d, 0x111e0f0f, 0xcb7bb0b0, 0xfca85454, 0xd66dbbbb, 0x3a2c1616];
    var T3 = [0x63a5c663, 0x7c84f87c, 0x7799ee77, 0x7b8df67b, 0xf20dfff2, 0x6bbdd66b, 0x6fb1de6f, 0xc55491c5, 0x30506030, 0x01030201, 0x67a9ce67, 0x2b7d562b, 0xfe19e7fe, 0xd762b5d7, 0xabe64dab, 0x769aec76, 0xca458fca, 0x829d1f82, 0xc94089c9, 0x7d87fa7d, 0xfa15effa, 0x59ebb259, 0x47c98e47, 0xf00bfbf0, 0xadec41ad, 0xd467b3d4, 0xa2fd5fa2, 0xafea45af, 0x9cbf239c, 0xa4f753a4, 0x7296e472, 0xc05b9bc0, 0xb7c275b7, 0xfd1ce1fd, 0x93ae3d93, 0x266a4c26, 0x365a6c36, 0x3f417e3f, 0xf702f5f7, 0xcc4f83cc, 0x345c6834, 0xa5f451a5, 0xe534d1e5, 0xf108f9f1, 0x7193e271, 0xd873abd8, 0x31536231, 0x153f2a15, 0x040c0804, 0xc75295c7, 0x23654623, 0xc35e9dc3, 0x18283018, 0x96a13796, 0x050f0a05, 0x9ab52f9a, 0x07090e07, 0x12362412, 0x809b1b80, 0xe23ddfe2, 0xeb26cdeb, 0x27694e27, 0xb2cd7fb2, 0x759fea75, 0x091b1209, 0x839e1d83, 0x2c74582c, 0x1a2e341a, 0x1b2d361b, 0x6eb2dc6e, 0x5aeeb45a, 0xa0fb5ba0, 0x52f6a452, 0x3b4d763b, 0xd661b7d6, 0xb3ce7db3, 0x297b5229, 0xe33edde3, 0x2f715e2f, 0x84971384, 0x53f5a653, 0xd168b9d1, 0x00000000, 0xed2cc1ed, 0x20604020, 0xfc1fe3fc, 0xb1c879b1, 0x5bedb65b, 0x6abed46a, 0xcb468dcb, 0xbed967be, 0x394b7239, 0x4ade944a, 0x4cd4984c, 0x58e8b058, 0xcf4a85cf, 0xd06bbbd0, 0xef2ac5ef, 0xaae54faa, 0xfb16edfb, 0x43c58643, 0x4dd79a4d, 0x33556633, 0x85941185, 0x45cf8a45, 0xf910e9f9, 0x02060402, 0x7f81fe7f, 0x50f0a050, 0x3c44783c, 0x9fba259f, 0xa8e34ba8, 0x51f3a251, 0xa3fe5da3, 0x40c08040, 0x8f8a058f, 0x92ad3f92, 0x9dbc219d, 0x38487038, 0xf504f1f5, 0xbcdf63bc, 0xb6c177b6, 0xda75afda, 0x21634221, 0x10302010, 0xff1ae5ff, 0xf30efdf3, 0xd26dbfd2, 0xcd4c81cd, 0x0c14180c, 0x13352613, 0xec2fc3ec, 0x5fe1be5f, 0x97a23597, 0x44cc8844, 0x17392e17, 0xc45793c4, 0xa7f255a7, 0x7e82fc7e, 0x3d477a3d, 0x64acc864, 0x5de7ba5d, 0x192b3219, 0x7395e673, 0x60a0c060, 0x81981981, 0x4fd19e4f, 0xdc7fa3dc, 0x22664422, 0x2a7e542a, 0x90ab3b90, 0x88830b88, 0x46ca8c46, 0xee29c7ee, 0xb8d36bb8, 0x143c2814, 0xde79a7de, 0x5ee2bc5e, 0x0b1d160b, 0xdb76addb, 0xe03bdbe0, 0x32566432, 0x3a4e743a, 0x0a1e140a, 0x49db9249, 0x060a0c06, 0x246c4824, 0x5ce4b85c, 0xc25d9fc2, 0xd36ebdd3, 0xacef43ac, 0x62a6c462, 0x91a83991, 0x95a43195, 0xe437d3e4, 0x798bf279, 0xe732d5e7, 0xc8438bc8, 0x37596e37, 0x6db7da6d, 0x8d8c018d, 0xd564b1d5, 0x4ed29c4e, 0xa9e049a9, 0x6cb4d86c, 0x56faac56, 0xf407f3f4, 0xea25cfea, 0x65afca65, 0x7a8ef47a, 0xaee947ae, 0x08181008, 0xbad56fba, 0x7888f078, 0x256f4a25, 0x2e725c2e, 0x1c24381c, 0xa6f157a6, 0xb4c773b4, 0xc65197c6, 0xe823cbe8, 0xdd7ca1dd, 0x749ce874, 0x1f213e1f, 0x4bdd964b, 0xbddc61bd, 0x8b860d8b, 0x8a850f8a, 0x7090e070, 0x3e427c3e, 0xb5c471b5, 0x66aacc66, 0x48d89048, 0x03050603, 0xf601f7f6, 0x0e121c0e, 0x61a3c261, 0x355f6a35, 0x57f9ae57, 0xb9d069b9, 0x86911786, 0xc15899c1, 0x1d273a1d, 0x9eb9279e, 0xe138d9e1, 0xf813ebf8, 0x98b32b98, 0x11332211, 0x69bbd269, 0xd970a9d9, 0x8e89078e, 0x94a73394, 0x9bb62d9b, 0x1e223c1e, 0x87921587, 0xe920c9e9, 0xce4987ce, 0x55ffaa55, 0x28785028, 0xdf7aa5df, 0x8c8f038c, 0xa1f859a1, 0x89800989, 0x0d171a0d, 0xbfda65bf, 0xe631d7e6, 0x42c68442, 0x68b8d068, 0x41c38241, 0x99b02999, 0x2d775a2d, 0x0f111e0f, 0xb0cb7bb0, 0x54fca854, 0xbbd66dbb, 0x163a2c16];
    var T4 = [0x6363a5c6, 0x7c7c84f8, 0x777799ee, 0x7b7b8df6, 0xf2f20dff, 0x6b6bbdd6, 0x6f6fb1de, 0xc5c55491, 0x30305060, 0x01010302, 0x6767a9ce, 0x2b2b7d56, 0xfefe19e7, 0xd7d762b5, 0xababe64d, 0x76769aec, 0xcaca458f, 0x82829d1f, 0xc9c94089, 0x7d7d87fa, 0xfafa15ef, 0x5959ebb2, 0x4747c98e, 0xf0f00bfb, 0xadadec41, 0xd4d467b3, 0xa2a2fd5f, 0xafafea45, 0x9c9cbf23, 0xa4a4f753, 0x727296e4, 0xc0c05b9b, 0xb7b7c275, 0xfdfd1ce1, 0x9393ae3d, 0x26266a4c, 0x36365a6c, 0x3f3f417e, 0xf7f702f5, 0xcccc4f83, 0x34345c68, 0xa5a5f451, 0xe5e534d1, 0xf1f108f9, 0x717193e2, 0xd8d873ab, 0x31315362, 0x15153f2a, 0x04040c08, 0xc7c75295, 0x23236546, 0xc3c35e9d, 0x18182830, 0x9696a137, 0x05050f0a, 0x9a9ab52f, 0x0707090e, 0x12123624, 0x80809b1b, 0xe2e23ddf, 0xebeb26cd, 0x2727694e, 0xb2b2cd7f, 0x75759fea, 0x09091b12, 0x83839e1d, 0x2c2c7458, 0x1a1a2e34, 0x1b1b2d36, 0x6e6eb2dc, 0x5a5aeeb4, 0xa0a0fb5b, 0x5252f6a4, 0x3b3b4d76, 0xd6d661b7, 0xb3b3ce7d, 0x29297b52, 0xe3e33edd, 0x2f2f715e, 0x84849713, 0x5353f5a6, 0xd1d168b9, 0x00000000, 0xeded2cc1, 0x20206040, 0xfcfc1fe3, 0xb1b1c879, 0x5b5bedb6, 0x6a6abed4, 0xcbcb468d, 0xbebed967, 0x39394b72, 0x4a4ade94, 0x4c4cd498, 0x5858e8b0, 0xcfcf4a85, 0xd0d06bbb, 0xefef2ac5, 0xaaaae54f, 0xfbfb16ed, 0x4343c586, 0x4d4dd79a, 0x33335566, 0x85859411, 0x4545cf8a, 0xf9f910e9, 0x02020604, 0x7f7f81fe, 0x5050f0a0, 0x3c3c4478, 0x9f9fba25, 0xa8a8e34b, 0x5151f3a2, 0xa3a3fe5d, 0x4040c080, 0x8f8f8a05, 0x9292ad3f, 0x9d9dbc21, 0x38384870, 0xf5f504f1, 0xbcbcdf63, 0xb6b6c177, 0xdada75af, 0x21216342, 0x10103020, 0xffff1ae5, 0xf3f30efd, 0xd2d26dbf, 0xcdcd4c81, 0x0c0c1418, 0x13133526, 0xecec2fc3, 0x5f5fe1be, 0x9797a235, 0x4444cc88, 0x1717392e, 0xc4c45793, 0xa7a7f255, 0x7e7e82fc, 0x3d3d477a, 0x6464acc8, 0x5d5de7ba, 0x19192b32, 0x737395e6, 0x6060a0c0, 0x81819819, 0x4f4fd19e, 0xdcdc7fa3, 0x22226644, 0x2a2a7e54, 0x9090ab3b, 0x8888830b, 0x4646ca8c, 0xeeee29c7, 0xb8b8d36b, 0x14143c28, 0xdede79a7, 0x5e5ee2bc, 0x0b0b1d16, 0xdbdb76ad, 0xe0e03bdb, 0x32325664, 0x3a3a4e74, 0x0a0a1e14, 0x4949db92, 0x06060a0c, 0x24246c48, 0x5c5ce4b8, 0xc2c25d9f, 0xd3d36ebd, 0xacacef43, 0x6262a6c4, 0x9191a839, 0x9595a431, 0xe4e437d3, 0x79798bf2, 0xe7e732d5, 0xc8c8438b, 0x3737596e, 0x6d6db7da, 0x8d8d8c01, 0xd5d564b1, 0x4e4ed29c, 0xa9a9e049, 0x6c6cb4d8, 0x5656faac, 0xf4f407f3, 0xeaea25cf, 0x6565afca, 0x7a7a8ef4, 0xaeaee947, 0x08081810, 0xbabad56f, 0x787888f0, 0x25256f4a, 0x2e2e725c, 0x1c1c2438, 0xa6a6f157, 0xb4b4c773, 0xc6c65197, 0xe8e823cb, 0xdddd7ca1, 0x74749ce8, 0x1f1f213e, 0x4b4bdd96, 0xbdbddc61, 0x8b8b860d, 0x8a8a850f, 0x707090e0, 0x3e3e427c, 0xb5b5c471, 0x6666aacc, 0x4848d890, 0x03030506, 0xf6f601f7, 0x0e0e121c, 0x6161a3c2, 0x35355f6a, 0x5757f9ae, 0xb9b9d069, 0x86869117, 0xc1c15899, 0x1d1d273a, 0x9e9eb927, 0xe1e138d9, 0xf8f813eb, 0x9898b32b, 0x11113322, 0x6969bbd2, 0xd9d970a9, 0x8e8e8907, 0x9494a733, 0x9b9bb62d, 0x1e1e223c, 0x87879215, 0xe9e920c9, 0xcece4987, 0x5555ffaa, 0x28287850, 0xdfdf7aa5, 0x8c8c8f03, 0xa1a1f859, 0x89898009, 0x0d0d171a, 0xbfbfda65, 0xe6e631d7, 0x4242c684, 0x6868b8d0, 0x4141c382, 0x9999b029, 0x2d2d775a, 0x0f0f111e, 0xb0b0cb7b, 0x5454fca8, 0xbbbbd66d, 0x16163a2c];

    // Transformations for decryption
    var T5 = [0x51f4a750, 0x7e416553, 0x1a17a4c3, 0x3a275e96, 0x3bab6bcb, 0x1f9d45f1, 0xacfa58ab, 0x4be30393, 0x2030fa55, 0xad766df6, 0x88cc7691, 0xf5024c25, 0x4fe5d7fc, 0xc52acbd7, 0x26354480, 0xb562a38f, 0xdeb15a49, 0x25ba1b67, 0x45ea0e98, 0x5dfec0e1, 0xc32f7502, 0x814cf012, 0x8d4697a3, 0x6bd3f9c6, 0x038f5fe7, 0x15929c95, 0xbf6d7aeb, 0x955259da, 0xd4be832d, 0x587421d3, 0x49e06929, 0x8ec9c844, 0x75c2896a, 0xf48e7978, 0x99583e6b, 0x27b971dd, 0xbee14fb6, 0xf088ad17, 0xc920ac66, 0x7dce3ab4, 0x63df4a18, 0xe51a3182, 0x97513360, 0x62537f45, 0xb16477e0, 0xbb6bae84, 0xfe81a01c, 0xf9082b94, 0x70486858, 0x8f45fd19, 0x94de6c87, 0x527bf8b7, 0xab73d323, 0x724b02e2, 0xe31f8f57, 0x6655ab2a, 0xb2eb2807, 0x2fb5c203, 0x86c57b9a, 0xd33708a5, 0x302887f2, 0x23bfa5b2, 0x02036aba, 0xed16825c, 0x8acf1c2b, 0xa779b492, 0xf307f2f0, 0x4e69e2a1, 0x65daf4cd, 0x0605bed5, 0xd134621f, 0xc4a6fe8a, 0x342e539d, 0xa2f355a0, 0x058ae132, 0xa4f6eb75, 0x0b83ec39, 0x4060efaa, 0x5e719f06, 0xbd6e1051, 0x3e218af9, 0x96dd063d, 0xdd3e05ae, 0x4de6bd46, 0x91548db5, 0x71c45d05, 0x0406d46f, 0x605015ff, 0x1998fb24, 0xd6bde997, 0x894043cc, 0x67d99e77, 0xb0e842bd, 0x07898b88, 0xe7195b38, 0x79c8eedb, 0xa17c0a47, 0x7c420fe9, 0xf8841ec9, 0x00000000, 0x09808683, 0x322bed48, 0x1e1170ac, 0x6c5a724e, 0xfd0efffb, 0x0f853856, 0x3daed51e, 0x362d3927, 0x0a0fd964, 0x685ca621, 0x9b5b54d1, 0x24362e3a, 0x0c0a67b1, 0x9357e70f, 0xb4ee96d2, 0x1b9b919e, 0x80c0c54f, 0x61dc20a2, 0x5a774b69, 0x1c121a16, 0xe293ba0a, 0xc0a02ae5, 0x3c22e043, 0x121b171d, 0x0e090d0b, 0xf28bc7ad, 0x2db6a8b9, 0x141ea9c8, 0x57f11985, 0xaf75074c, 0xee99ddbb, 0xa37f60fd, 0xf701269f, 0x5c72f5bc, 0x44663bc5, 0x5bfb7e34, 0x8b432976, 0xcb23c6dc, 0xb6edfc68, 0xb8e4f163, 0xd731dcca, 0x42638510, 0x13972240, 0x84c61120, 0x854a247d, 0xd2bb3df8, 0xaef93211, 0xc729a16d, 0x1d9e2f4b, 0xdcb230f3, 0x0d8652ec, 0x77c1e3d0, 0x2bb3166c, 0xa970b999, 0x119448fa, 0x47e96422, 0xa8fc8cc4, 0xa0f03f1a, 0x567d2cd8, 0x223390ef, 0x87494ec7, 0xd938d1c1, 0x8ccaa2fe, 0x98d40b36, 0xa6f581cf, 0xa57ade28, 0xdab78e26, 0x3fadbfa4, 0x2c3a9de4, 0x5078920d, 0x6a5fcc9b, 0x547e4662, 0xf68d13c2, 0x90d8b8e8, 0x2e39f75e, 0x82c3aff5, 0x9f5d80be, 0x69d0937c, 0x6fd52da9, 0xcf2512b3, 0xc8ac993b, 0x10187da7, 0xe89c636e, 0xdb3bbb7b, 0xcd267809, 0x6e5918f4, 0xec9ab701, 0x834f9aa8, 0xe6956e65, 0xaaffe67e, 0x21bccf08, 0xef15e8e6, 0xbae79bd9, 0x4a6f36ce, 0xea9f09d4, 0x29b07cd6, 0x31a4b2af, 0x2a3f2331, 0xc6a59430, 0x35a266c0, 0x744ebc37, 0xfc82caa6, 0xe090d0b0, 0x33a7d815, 0xf104984a, 0x41ecdaf7, 0x7fcd500e, 0x1791f62f, 0x764dd68d, 0x43efb04d, 0xccaa4d54, 0xe49604df, 0x9ed1b5e3, 0x4c6a881b, 0xc12c1fb8, 0x4665517f, 0x9d5eea04, 0x018c355d, 0xfa877473, 0xfb0b412e, 0xb3671d5a, 0x92dbd252, 0xe9105633, 0x6dd64713, 0x9ad7618c, 0x37a10c7a, 0x59f8148e, 0xeb133c89, 0xcea927ee, 0xb761c935, 0xe11ce5ed, 0x7a47b13c, 0x9cd2df59, 0x55f2733f, 0x1814ce79, 0x73c737bf, 0x53f7cdea, 0x5ffdaa5b, 0xdf3d6f14, 0x7844db86, 0xcaaff381, 0xb968c43e, 0x3824342c, 0xc2a3405f, 0x161dc372, 0xbce2250c, 0x283c498b, 0xff0d9541, 0x39a80171, 0x080cb3de, 0xd8b4e49c, 0x6456c190, 0x7bcb8461, 0xd532b670, 0x486c5c74, 0xd0b85742];
    var T6 = [0x5051f4a7, 0x537e4165, 0xc31a17a4, 0x963a275e, 0xcb3bab6b, 0xf11f9d45, 0xabacfa58, 0x934be303, 0x552030fa, 0xf6ad766d, 0x9188cc76, 0x25f5024c, 0xfc4fe5d7, 0xd7c52acb, 0x80263544, 0x8fb562a3, 0x49deb15a, 0x6725ba1b, 0x9845ea0e, 0xe15dfec0, 0x02c32f75, 0x12814cf0, 0xa38d4697, 0xc66bd3f9, 0xe7038f5f, 0x9515929c, 0xebbf6d7a, 0xda955259, 0x2dd4be83, 0xd3587421, 0x2949e069, 0x448ec9c8, 0x6a75c289, 0x78f48e79, 0x6b99583e, 0xdd27b971, 0xb6bee14f, 0x17f088ad, 0x66c920ac, 0xb47dce3a, 0x1863df4a, 0x82e51a31, 0x60975133, 0x4562537f, 0xe0b16477, 0x84bb6bae, 0x1cfe81a0, 0x94f9082b, 0x58704868, 0x198f45fd, 0x8794de6c, 0xb7527bf8, 0x23ab73d3, 0xe2724b02, 0x57e31f8f, 0x2a6655ab, 0x07b2eb28, 0x032fb5c2, 0x9a86c57b, 0xa5d33708, 0xf2302887, 0xb223bfa5, 0xba02036a, 0x5ced1682, 0x2b8acf1c, 0x92a779b4, 0xf0f307f2, 0xa14e69e2, 0xcd65daf4, 0xd50605be, 0x1fd13462, 0x8ac4a6fe, 0x9d342e53, 0xa0a2f355, 0x32058ae1, 0x75a4f6eb, 0x390b83ec, 0xaa4060ef, 0x065e719f, 0x51bd6e10, 0xf93e218a, 0x3d96dd06, 0xaedd3e05, 0x464de6bd, 0xb591548d, 0x0571c45d, 0x6f0406d4, 0xff605015, 0x241998fb, 0x97d6bde9, 0xcc894043, 0x7767d99e, 0xbdb0e842, 0x8807898b, 0x38e7195b, 0xdb79c8ee, 0x47a17c0a, 0xe97c420f, 0xc9f8841e, 0x00000000, 0x83098086, 0x48322bed, 0xac1e1170, 0x4e6c5a72, 0xfbfd0eff, 0x560f8538, 0x1e3daed5, 0x27362d39, 0x640a0fd9, 0x21685ca6, 0xd19b5b54, 0x3a24362e, 0xb10c0a67, 0x0f9357e7, 0xd2b4ee96, 0x9e1b9b91, 0x4f80c0c5, 0xa261dc20, 0x695a774b, 0x161c121a, 0x0ae293ba, 0xe5c0a02a, 0x433c22e0, 0x1d121b17, 0x0b0e090d, 0xadf28bc7, 0xb92db6a8, 0xc8141ea9, 0x8557f119, 0x4caf7507, 0xbbee99dd, 0xfda37f60, 0x9ff70126, 0xbc5c72f5, 0xc544663b, 0x345bfb7e, 0x768b4329, 0xdccb23c6, 0x68b6edfc, 0x63b8e4f1, 0xcad731dc, 0x10426385, 0x40139722, 0x2084c611, 0x7d854a24, 0xf8d2bb3d, 0x11aef932, 0x6dc729a1, 0x4b1d9e2f, 0xf3dcb230, 0xec0d8652, 0xd077c1e3, 0x6c2bb316, 0x99a970b9, 0xfa119448, 0x2247e964, 0xc4a8fc8c, 0x1aa0f03f, 0xd8567d2c, 0xef223390, 0xc787494e, 0xc1d938d1, 0xfe8ccaa2, 0x3698d40b, 0xcfa6f581, 0x28a57ade, 0x26dab78e, 0xa43fadbf, 0xe42c3a9d, 0x0d507892, 0x9b6a5fcc, 0x62547e46, 0xc2f68d13, 0xe890d8b8, 0x5e2e39f7, 0xf582c3af, 0xbe9f5d80, 0x7c69d093, 0xa96fd52d, 0xb3cf2512, 0x3bc8ac99, 0xa710187d, 0x6ee89c63, 0x7bdb3bbb, 0x09cd2678, 0xf46e5918, 0x01ec9ab7, 0xa8834f9a, 0x65e6956e, 0x7eaaffe6, 0x0821bccf, 0xe6ef15e8, 0xd9bae79b, 0xce4a6f36, 0xd4ea9f09, 0xd629b07c, 0xaf31a4b2, 0x312a3f23, 0x30c6a594, 0xc035a266, 0x37744ebc, 0xa6fc82ca, 0xb0e090d0, 0x1533a7d8, 0x4af10498, 0xf741ecda, 0x0e7fcd50, 0x2f1791f6, 0x8d764dd6, 0x4d43efb0, 0x54ccaa4d, 0xdfe49604, 0xe39ed1b5, 0x1b4c6a88, 0xb8c12c1f, 0x7f466551, 0x049d5eea, 0x5d018c35, 0x73fa8774, 0x2efb0b41, 0x5ab3671d, 0x5292dbd2, 0x33e91056, 0x136dd647, 0x8c9ad761, 0x7a37a10c, 0x8e59f814, 0x89eb133c, 0xeecea927, 0x35b761c9, 0xede11ce5, 0x3c7a47b1, 0x599cd2df, 0x3f55f273, 0x791814ce, 0xbf73c737, 0xea53f7cd, 0x5b5ffdaa, 0x14df3d6f, 0x867844db, 0x81caaff3, 0x3eb968c4, 0x2c382434, 0x5fc2a340, 0x72161dc3, 0x0cbce225, 0x8b283c49, 0x41ff0d95, 0x7139a801, 0xde080cb3, 0x9cd8b4e4, 0x906456c1, 0x617bcb84, 0x70d532b6, 0x74486c5c, 0x42d0b857];
    var T7 = [0xa75051f4, 0x65537e41, 0xa4c31a17, 0x5e963a27, 0x6bcb3bab, 0x45f11f9d, 0x58abacfa, 0x03934be3, 0xfa552030, 0x6df6ad76, 0x769188cc, 0x4c25f502, 0xd7fc4fe5, 0xcbd7c52a, 0x44802635, 0xa38fb562, 0x5a49deb1, 0x1b6725ba, 0x0e9845ea, 0xc0e15dfe, 0x7502c32f, 0xf012814c, 0x97a38d46, 0xf9c66bd3, 0x5fe7038f, 0x9c951592, 0x7aebbf6d, 0x59da9552, 0x832dd4be, 0x21d35874, 0x692949e0, 0xc8448ec9, 0x896a75c2, 0x7978f48e, 0x3e6b9958, 0x71dd27b9, 0x4fb6bee1, 0xad17f088, 0xac66c920, 0x3ab47dce, 0x4a1863df, 0x3182e51a, 0x33609751, 0x7f456253, 0x77e0b164, 0xae84bb6b, 0xa01cfe81, 0x2b94f908, 0x68587048, 0xfd198f45, 0x6c8794de, 0xf8b7527b, 0xd323ab73, 0x02e2724b, 0x8f57e31f, 0xab2a6655, 0x2807b2eb, 0xc2032fb5, 0x7b9a86c5, 0x08a5d337, 0x87f23028, 0xa5b223bf, 0x6aba0203, 0x825ced16, 0x1c2b8acf, 0xb492a779, 0xf2f0f307, 0xe2a14e69, 0xf4cd65da, 0xbed50605, 0x621fd134, 0xfe8ac4a6, 0x539d342e, 0x55a0a2f3, 0xe132058a, 0xeb75a4f6, 0xec390b83, 0xefaa4060, 0x9f065e71, 0x1051bd6e, 0x8af93e21, 0x063d96dd, 0x05aedd3e, 0xbd464de6, 0x8db59154, 0x5d0571c4, 0xd46f0406, 0x15ff6050, 0xfb241998, 0xe997d6bd, 0x43cc8940, 0x9e7767d9, 0x42bdb0e8, 0x8b880789, 0x5b38e719, 0xeedb79c8, 0x0a47a17c, 0x0fe97c42, 0x1ec9f884, 0x00000000, 0x86830980, 0xed48322b, 0x70ac1e11, 0x724e6c5a, 0xfffbfd0e, 0x38560f85, 0xd51e3dae, 0x3927362d, 0xd9640a0f, 0xa621685c, 0x54d19b5b, 0x2e3a2436, 0x67b10c0a, 0xe70f9357, 0x96d2b4ee, 0x919e1b9b, 0xc54f80c0, 0x20a261dc, 0x4b695a77, 0x1a161c12, 0xba0ae293, 0x2ae5c0a0, 0xe0433c22, 0x171d121b, 0x0d0b0e09, 0xc7adf28b, 0xa8b92db6, 0xa9c8141e, 0x198557f1, 0x074caf75, 0xddbbee99, 0x60fda37f, 0x269ff701, 0xf5bc5c72, 0x3bc54466, 0x7e345bfb, 0x29768b43, 0xc6dccb23, 0xfc68b6ed, 0xf163b8e4, 0xdccad731, 0x85104263, 0x22401397, 0x112084c6, 0x247d854a, 0x3df8d2bb, 0x3211aef9, 0xa16dc729, 0x2f4b1d9e, 0x30f3dcb2, 0x52ec0d86, 0xe3d077c1, 0x166c2bb3, 0xb999a970, 0x48fa1194, 0x642247e9, 0x8cc4a8fc, 0x3f1aa0f0, 0x2cd8567d, 0x90ef2233, 0x4ec78749, 0xd1c1d938, 0xa2fe8cca, 0x0b3698d4, 0x81cfa6f5, 0xde28a57a, 0x8e26dab7, 0xbfa43fad, 0x9de42c3a, 0x920d5078, 0xcc9b6a5f, 0x4662547e, 0x13c2f68d, 0xb8e890d8, 0xf75e2e39, 0xaff582c3, 0x80be9f5d, 0x937c69d0, 0x2da96fd5, 0x12b3cf25, 0x993bc8ac, 0x7da71018, 0x636ee89c, 0xbb7bdb3b, 0x7809cd26, 0x18f46e59, 0xb701ec9a, 0x9aa8834f, 0x6e65e695, 0xe67eaaff, 0xcf0821bc, 0xe8e6ef15, 0x9bd9bae7, 0x36ce4a6f, 0x09d4ea9f, 0x7cd629b0, 0xb2af31a4, 0x23312a3f, 0x9430c6a5, 0x66c035a2, 0xbc37744e, 0xcaa6fc82, 0xd0b0e090, 0xd81533a7, 0x984af104, 0xdaf741ec, 0x500e7fcd, 0xf62f1791, 0xd68d764d, 0xb04d43ef, 0x4d54ccaa, 0x04dfe496, 0xb5e39ed1, 0x881b4c6a, 0x1fb8c12c, 0x517f4665, 0xea049d5e, 0x355d018c, 0x7473fa87, 0x412efb0b, 0x1d5ab367, 0xd25292db, 0x5633e910, 0x47136dd6, 0x618c9ad7, 0x0c7a37a1, 0x148e59f8, 0x3c89eb13, 0x27eecea9, 0xc935b761, 0xe5ede11c, 0xb13c7a47, 0xdf599cd2, 0x733f55f2, 0xce791814, 0x37bf73c7, 0xcdea53f7, 0xaa5b5ffd, 0x6f14df3d, 0xdb867844, 0xf381caaf, 0xc43eb968, 0x342c3824, 0x405fc2a3, 0xc372161d, 0x250cbce2, 0x498b283c, 0x9541ff0d, 0x017139a8, 0xb3de080c, 0xe49cd8b4, 0xc1906456, 0x84617bcb, 0xb670d532, 0x5c74486c, 0x5742d0b8];
    var T8 = [0xf4a75051, 0x4165537e, 0x17a4c31a, 0x275e963a, 0xab6bcb3b, 0x9d45f11f, 0xfa58abac, 0xe303934b, 0x30fa5520, 0x766df6ad, 0xcc769188, 0x024c25f5, 0xe5d7fc4f, 0x2acbd7c5, 0x35448026, 0x62a38fb5, 0xb15a49de, 0xba1b6725, 0xea0e9845, 0xfec0e15d, 0x2f7502c3, 0x4cf01281, 0x4697a38d, 0xd3f9c66b, 0x8f5fe703, 0x929c9515, 0x6d7aebbf, 0x5259da95, 0xbe832dd4, 0x7421d358, 0xe0692949, 0xc9c8448e, 0xc2896a75, 0x8e7978f4, 0x583e6b99, 0xb971dd27, 0xe14fb6be, 0x88ad17f0, 0x20ac66c9, 0xce3ab47d, 0xdf4a1863, 0x1a3182e5, 0x51336097, 0x537f4562, 0x6477e0b1, 0x6bae84bb, 0x81a01cfe, 0x082b94f9, 0x48685870, 0x45fd198f, 0xde6c8794, 0x7bf8b752, 0x73d323ab, 0x4b02e272, 0x1f8f57e3, 0x55ab2a66, 0xeb2807b2, 0xb5c2032f, 0xc57b9a86, 0x3708a5d3, 0x2887f230, 0xbfa5b223, 0x036aba02, 0x16825ced, 0xcf1c2b8a, 0x79b492a7, 0x07f2f0f3, 0x69e2a14e, 0xdaf4cd65, 0x05bed506, 0x34621fd1, 0xa6fe8ac4, 0x2e539d34, 0xf355a0a2, 0x8ae13205, 0xf6eb75a4, 0x83ec390b, 0x60efaa40, 0x719f065e, 0x6e1051bd, 0x218af93e, 0xdd063d96, 0x3e05aedd, 0xe6bd464d, 0x548db591, 0xc45d0571, 0x06d46f04, 0x5015ff60, 0x98fb2419, 0xbde997d6, 0x4043cc89, 0xd99e7767, 0xe842bdb0, 0x898b8807, 0x195b38e7, 0xc8eedb79, 0x7c0a47a1, 0x420fe97c, 0x841ec9f8, 0x00000000, 0x80868309, 0x2bed4832, 0x1170ac1e, 0x5a724e6c, 0x0efffbfd, 0x8538560f, 0xaed51e3d, 0x2d392736, 0x0fd9640a, 0x5ca62168, 0x5b54d19b, 0x362e3a24, 0x0a67b10c, 0x57e70f93, 0xee96d2b4, 0x9b919e1b, 0xc0c54f80, 0xdc20a261, 0x774b695a, 0x121a161c, 0x93ba0ae2, 0xa02ae5c0, 0x22e0433c, 0x1b171d12, 0x090d0b0e, 0x8bc7adf2, 0xb6a8b92d, 0x1ea9c814, 0xf1198557, 0x75074caf, 0x99ddbbee, 0x7f60fda3, 0x01269ff7, 0x72f5bc5c, 0x663bc544, 0xfb7e345b, 0x4329768b, 0x23c6dccb, 0xedfc68b6, 0xe4f163b8, 0x31dccad7, 0x63851042, 0x97224013, 0xc6112084, 0x4a247d85, 0xbb3df8d2, 0xf93211ae, 0x29a16dc7, 0x9e2f4b1d, 0xb230f3dc, 0x8652ec0d, 0xc1e3d077, 0xb3166c2b, 0x70b999a9, 0x9448fa11, 0xe9642247, 0xfc8cc4a8, 0xf03f1aa0, 0x7d2cd856, 0x3390ef22, 0x494ec787, 0x38d1c1d9, 0xcaa2fe8c, 0xd40b3698, 0xf581cfa6, 0x7ade28a5, 0xb78e26da, 0xadbfa43f, 0x3a9de42c, 0x78920d50, 0x5fcc9b6a, 0x7e466254, 0x8d13c2f6, 0xd8b8e890, 0x39f75e2e, 0xc3aff582, 0x5d80be9f, 0xd0937c69, 0xd52da96f, 0x2512b3cf, 0xac993bc8, 0x187da710, 0x9c636ee8, 0x3bbb7bdb, 0x267809cd, 0x5918f46e, 0x9ab701ec, 0x4f9aa883, 0x956e65e6, 0xffe67eaa, 0xbccf0821, 0x15e8e6ef, 0xe79bd9ba, 0x6f36ce4a, 0x9f09d4ea, 0xb07cd629, 0xa4b2af31, 0x3f23312a, 0xa59430c6, 0xa266c035, 0x4ebc3774, 0x82caa6fc, 0x90d0b0e0, 0xa7d81533, 0x04984af1, 0xecdaf741, 0xcd500e7f, 0x91f62f17, 0x4dd68d76, 0xefb04d43, 0xaa4d54cc, 0x9604dfe4, 0xd1b5e39e, 0x6a881b4c, 0x2c1fb8c1, 0x65517f46, 0x5eea049d, 0x8c355d01, 0x877473fa, 0x0b412efb, 0x671d5ab3, 0xdbd25292, 0x105633e9, 0xd647136d, 0xd7618c9a, 0xa10c7a37, 0xf8148e59, 0x133c89eb, 0xa927eece, 0x61c935b7, 0x1ce5ede1, 0x47b13c7a, 0xd2df599c, 0xf2733f55, 0x14ce7918, 0xc737bf73, 0xf7cdea53, 0xfdaa5b5f, 0x3d6f14df, 0x44db8678, 0xaff381ca, 0x68c43eb9, 0x24342c38, 0xa3405fc2, 0x1dc37216, 0xe2250cbc, 0x3c498b28, 0x0d9541ff, 0xa8017139, 0x0cb3de08, 0xb4e49cd8, 0x56c19064, 0xcb84617b, 0x32b670d5, 0x6c5c7448, 0xb85742d0];

    // Transformations for decryption key expansion
    var U1 = [0x00000000, 0x0e090d0b, 0x1c121a16, 0x121b171d, 0x3824342c, 0x362d3927, 0x24362e3a, 0x2a3f2331, 0x70486858, 0x7e416553, 0x6c5a724e, 0x62537f45, 0x486c5c74, 0x4665517f, 0x547e4662, 0x5a774b69, 0xe090d0b0, 0xee99ddbb, 0xfc82caa6, 0xf28bc7ad, 0xd8b4e49c, 0xd6bde997, 0xc4a6fe8a, 0xcaaff381, 0x90d8b8e8, 0x9ed1b5e3, 0x8ccaa2fe, 0x82c3aff5, 0xa8fc8cc4, 0xa6f581cf, 0xb4ee96d2, 0xbae79bd9, 0xdb3bbb7b, 0xd532b670, 0xc729a16d, 0xc920ac66, 0xe31f8f57, 0xed16825c, 0xff0d9541, 0xf104984a, 0xab73d323, 0xa57ade28, 0xb761c935, 0xb968c43e, 0x9357e70f, 0x9d5eea04, 0x8f45fd19, 0x814cf012, 0x3bab6bcb, 0x35a266c0, 0x27b971dd, 0x29b07cd6, 0x038f5fe7, 0x0d8652ec, 0x1f9d45f1, 0x119448fa, 0x4be30393, 0x45ea0e98, 0x57f11985, 0x59f8148e, 0x73c737bf, 0x7dce3ab4, 0x6fd52da9, 0x61dc20a2, 0xad766df6, 0xa37f60fd, 0xb16477e0, 0xbf6d7aeb, 0x955259da, 0x9b5b54d1, 0x894043cc, 0x87494ec7, 0xdd3e05ae, 0xd33708a5, 0xc12c1fb8, 0xcf2512b3, 0xe51a3182, 0xeb133c89, 0xf9082b94, 0xf701269f, 0x4de6bd46, 0x43efb04d, 0x51f4a750, 0x5ffdaa5b, 0x75c2896a, 0x7bcb8461, 0x69d0937c, 0x67d99e77, 0x3daed51e, 0x33a7d815, 0x21bccf08, 0x2fb5c203, 0x058ae132, 0x0b83ec39, 0x1998fb24, 0x1791f62f, 0x764dd68d, 0x7844db86, 0x6a5fcc9b, 0x6456c190, 0x4e69e2a1, 0x4060efaa, 0x527bf8b7, 0x5c72f5bc, 0x0605bed5, 0x080cb3de, 0x1a17a4c3, 0x141ea9c8, 0x3e218af9, 0x302887f2, 0x223390ef, 0x2c3a9de4, 0x96dd063d, 0x98d40b36, 0x8acf1c2b, 0x84c61120, 0xaef93211, 0xa0f03f1a, 0xb2eb2807, 0xbce2250c, 0xe6956e65, 0xe89c636e, 0xfa877473, 0xf48e7978, 0xdeb15a49, 0xd0b85742, 0xc2a3405f, 0xccaa4d54, 0x41ecdaf7, 0x4fe5d7fc, 0x5dfec0e1, 0x53f7cdea, 0x79c8eedb, 0x77c1e3d0, 0x65daf4cd, 0x6bd3f9c6, 0x31a4b2af, 0x3fadbfa4, 0x2db6a8b9, 0x23bfa5b2, 0x09808683, 0x07898b88, 0x15929c95, 0x1b9b919e, 0xa17c0a47, 0xaf75074c, 0xbd6e1051, 0xb3671d5a, 0x99583e6b, 0x97513360, 0x854a247d, 0x8b432976, 0xd134621f, 0xdf3d6f14, 0xcd267809, 0xc32f7502, 0xe9105633, 0xe7195b38, 0xf5024c25, 0xfb0b412e, 0x9ad7618c, 0x94de6c87, 0x86c57b9a, 0x88cc7691, 0xa2f355a0, 0xacfa58ab, 0xbee14fb6, 0xb0e842bd, 0xea9f09d4, 0xe49604df, 0xf68d13c2, 0xf8841ec9, 0xd2bb3df8, 0xdcb230f3, 0xcea927ee, 0xc0a02ae5, 0x7a47b13c, 0x744ebc37, 0x6655ab2a, 0x685ca621, 0x42638510, 0x4c6a881b, 0x5e719f06, 0x5078920d, 0x0a0fd964, 0x0406d46f, 0x161dc372, 0x1814ce79, 0x322bed48, 0x3c22e043, 0x2e39f75e, 0x2030fa55, 0xec9ab701, 0xe293ba0a, 0xf088ad17, 0xfe81a01c, 0xd4be832d, 0xdab78e26, 0xc8ac993b, 0xc6a59430, 0x9cd2df59, 0x92dbd252, 0x80c0c54f, 0x8ec9c844, 0xa4f6eb75, 0xaaffe67e, 0xb8e4f163, 0xb6edfc68, 0x0c0a67b1, 0x02036aba, 0x10187da7, 0x1e1170ac, 0x342e539d, 0x3a275e96, 0x283c498b, 0x26354480, 0x7c420fe9, 0x724b02e2, 0x605015ff, 0x6e5918f4, 0x44663bc5, 0x4a6f36ce, 0x587421d3, 0x567d2cd8, 0x37a10c7a, 0x39a80171, 0x2bb3166c, 0x25ba1b67, 0x0f853856, 0x018c355d, 0x13972240, 0x1d9e2f4b, 0x47e96422, 0x49e06929, 0x5bfb7e34, 0x55f2733f, 0x7fcd500e, 0x71c45d05, 0x63df4a18, 0x6dd64713, 0xd731dcca, 0xd938d1c1, 0xcb23c6dc, 0xc52acbd7, 0xef15e8e6, 0xe11ce5ed, 0xf307f2f0, 0xfd0efffb, 0xa779b492, 0xa970b999, 0xbb6bae84, 0xb562a38f, 0x9f5d80be, 0x91548db5, 0x834f9aa8, 0x8d4697a3];
    var U2 = [0x00000000, 0x0b0e090d, 0x161c121a, 0x1d121b17, 0x2c382434, 0x27362d39, 0x3a24362e, 0x312a3f23, 0x58704868, 0x537e4165, 0x4e6c5a72, 0x4562537f, 0x74486c5c, 0x7f466551, 0x62547e46, 0x695a774b, 0xb0e090d0, 0xbbee99dd, 0xa6fc82ca, 0xadf28bc7, 0x9cd8b4e4, 0x97d6bde9, 0x8ac4a6fe, 0x81caaff3, 0xe890d8b8, 0xe39ed1b5, 0xfe8ccaa2, 0xf582c3af, 0xc4a8fc8c, 0xcfa6f581, 0xd2b4ee96, 0xd9bae79b, 0x7bdb3bbb, 0x70d532b6, 0x6dc729a1, 0x66c920ac, 0x57e31f8f, 0x5ced1682, 0x41ff0d95, 0x4af10498, 0x23ab73d3, 0x28a57ade, 0x35b761c9, 0x3eb968c4, 0x0f9357e7, 0x049d5eea, 0x198f45fd, 0x12814cf0, 0xcb3bab6b, 0xc035a266, 0xdd27b971, 0xd629b07c, 0xe7038f5f, 0xec0d8652, 0xf11f9d45, 0xfa119448, 0x934be303, 0x9845ea0e, 0x8557f119, 0x8e59f814, 0xbf73c737, 0xb47dce3a, 0xa96fd52d, 0xa261dc20, 0xf6ad766d, 0xfda37f60, 0xe0b16477, 0xebbf6d7a, 0xda955259, 0xd19b5b54, 0xcc894043, 0xc787494e, 0xaedd3e05, 0xa5d33708, 0xb8c12c1f, 0xb3cf2512, 0x82e51a31, 0x89eb133c, 0x94f9082b, 0x9ff70126, 0x464de6bd, 0x4d43efb0, 0x5051f4a7, 0x5b5ffdaa, 0x6a75c289, 0x617bcb84, 0x7c69d093, 0x7767d99e, 0x1e3daed5, 0x1533a7d8, 0x0821bccf, 0x032fb5c2, 0x32058ae1, 0x390b83ec, 0x241998fb, 0x2f1791f6, 0x8d764dd6, 0x867844db, 0x9b6a5fcc, 0x906456c1, 0xa14e69e2, 0xaa4060ef, 0xb7527bf8, 0xbc5c72f5, 0xd50605be, 0xde080cb3, 0xc31a17a4, 0xc8141ea9, 0xf93e218a, 0xf2302887, 0xef223390, 0xe42c3a9d, 0x3d96dd06, 0x3698d40b, 0x2b8acf1c, 0x2084c611, 0x11aef932, 0x1aa0f03f, 0x07b2eb28, 0x0cbce225, 0x65e6956e, 0x6ee89c63, 0x73fa8774, 0x78f48e79, 0x49deb15a, 0x42d0b857, 0x5fc2a340, 0x54ccaa4d, 0xf741ecda, 0xfc4fe5d7, 0xe15dfec0, 0xea53f7cd, 0xdb79c8ee, 0xd077c1e3, 0xcd65daf4, 0xc66bd3f9, 0xaf31a4b2, 0xa43fadbf, 0xb92db6a8, 0xb223bfa5, 0x83098086, 0x8807898b, 0x9515929c, 0x9e1b9b91, 0x47a17c0a, 0x4caf7507, 0x51bd6e10, 0x5ab3671d, 0x6b99583e, 0x60975133, 0x7d854a24, 0x768b4329, 0x1fd13462, 0x14df3d6f, 0x09cd2678, 0x02c32f75, 0x33e91056, 0x38e7195b, 0x25f5024c, 0x2efb0b41, 0x8c9ad761, 0x8794de6c, 0x9a86c57b, 0x9188cc76, 0xa0a2f355, 0xabacfa58, 0xb6bee14f, 0xbdb0e842, 0xd4ea9f09, 0xdfe49604, 0xc2f68d13, 0xc9f8841e, 0xf8d2bb3d, 0xf3dcb230, 0xeecea927, 0xe5c0a02a, 0x3c7a47b1, 0x37744ebc, 0x2a6655ab, 0x21685ca6, 0x10426385, 0x1b4c6a88, 0x065e719f, 0x0d507892, 0x640a0fd9, 0x6f0406d4, 0x72161dc3, 0x791814ce, 0x48322bed, 0x433c22e0, 0x5e2e39f7, 0x552030fa, 0x01ec9ab7, 0x0ae293ba, 0x17f088ad, 0x1cfe81a0, 0x2dd4be83, 0x26dab78e, 0x3bc8ac99, 0x30c6a594, 0x599cd2df, 0x5292dbd2, 0x4f80c0c5, 0x448ec9c8, 0x75a4f6eb, 0x7eaaffe6, 0x63b8e4f1, 0x68b6edfc, 0xb10c0a67, 0xba02036a, 0xa710187d, 0xac1e1170, 0x9d342e53, 0x963a275e, 0x8b283c49, 0x80263544, 0xe97c420f, 0xe2724b02, 0xff605015, 0xf46e5918, 0xc544663b, 0xce4a6f36, 0xd3587421, 0xd8567d2c, 0x7a37a10c, 0x7139a801, 0x6c2bb316, 0x6725ba1b, 0x560f8538, 0x5d018c35, 0x40139722, 0x4b1d9e2f, 0x2247e964, 0x2949e069, 0x345bfb7e, 0x3f55f273, 0x0e7fcd50, 0x0571c45d, 0x1863df4a, 0x136dd647, 0xcad731dc, 0xc1d938d1, 0xdccb23c6, 0xd7c52acb, 0xe6ef15e8, 0xede11ce5, 0xf0f307f2, 0xfbfd0eff, 0x92a779b4, 0x99a970b9, 0x84bb6bae, 0x8fb562a3, 0xbe9f5d80, 0xb591548d, 0xa8834f9a, 0xa38d4697];
    var U3 = [0x00000000, 0x0d0b0e09, 0x1a161c12, 0x171d121b, 0x342c3824, 0x3927362d, 0x2e3a2436, 0x23312a3f, 0x68587048, 0x65537e41, 0x724e6c5a, 0x7f456253, 0x5c74486c, 0x517f4665, 0x4662547e, 0x4b695a77, 0xd0b0e090, 0xddbbee99, 0xcaa6fc82, 0xc7adf28b, 0xe49cd8b4, 0xe997d6bd, 0xfe8ac4a6, 0xf381caaf, 0xb8e890d8, 0xb5e39ed1, 0xa2fe8cca, 0xaff582c3, 0x8cc4a8fc, 0x81cfa6f5, 0x96d2b4ee, 0x9bd9bae7, 0xbb7bdb3b, 0xb670d532, 0xa16dc729, 0xac66c920, 0x8f57e31f, 0x825ced16, 0x9541ff0d, 0x984af104, 0xd323ab73, 0xde28a57a, 0xc935b761, 0xc43eb968, 0xe70f9357, 0xea049d5e, 0xfd198f45, 0xf012814c, 0x6bcb3bab, 0x66c035a2, 0x71dd27b9, 0x7cd629b0, 0x5fe7038f, 0x52ec0d86, 0x45f11f9d, 0x48fa1194, 0x03934be3, 0x0e9845ea, 0x198557f1, 0x148e59f8, 0x37bf73c7, 0x3ab47dce, 0x2da96fd5, 0x20a261dc, 0x6df6ad76, 0x60fda37f, 0x77e0b164, 0x7aebbf6d, 0x59da9552, 0x54d19b5b, 0x43cc8940, 0x4ec78749, 0x05aedd3e, 0x08a5d337, 0x1fb8c12c, 0x12b3cf25, 0x3182e51a, 0x3c89eb13, 0x2b94f908, 0x269ff701, 0xbd464de6, 0xb04d43ef, 0xa75051f4, 0xaa5b5ffd, 0x896a75c2, 0x84617bcb, 0x937c69d0, 0x9e7767d9, 0xd51e3dae, 0xd81533a7, 0xcf0821bc, 0xc2032fb5, 0xe132058a, 0xec390b83, 0xfb241998, 0xf62f1791, 0xd68d764d, 0xdb867844, 0xcc9b6a5f, 0xc1906456, 0xe2a14e69, 0xefaa4060, 0xf8b7527b, 0xf5bc5c72, 0xbed50605, 0xb3de080c, 0xa4c31a17, 0xa9c8141e, 0x8af93e21, 0x87f23028, 0x90ef2233, 0x9de42c3a, 0x063d96dd, 0x0b3698d4, 0x1c2b8acf, 0x112084c6, 0x3211aef9, 0x3f1aa0f0, 0x2807b2eb, 0x250cbce2, 0x6e65e695, 0x636ee89c, 0x7473fa87, 0x7978f48e, 0x5a49deb1, 0x5742d0b8, 0x405fc2a3, 0x4d54ccaa, 0xdaf741ec, 0xd7fc4fe5, 0xc0e15dfe, 0xcdea53f7, 0xeedb79c8, 0xe3d077c1, 0xf4cd65da, 0xf9c66bd3, 0xb2af31a4, 0xbfa43fad, 0xa8b92db6, 0xa5b223bf, 0x86830980, 0x8b880789, 0x9c951592, 0x919e1b9b, 0x0a47a17c, 0x074caf75, 0x1051bd6e, 0x1d5ab367, 0x3e6b9958, 0x33609751, 0x247d854a, 0x29768b43, 0x621fd134, 0x6f14df3d, 0x7809cd26, 0x7502c32f, 0x5633e910, 0x5b38e719, 0x4c25f502, 0x412efb0b, 0x618c9ad7, 0x6c8794de, 0x7b9a86c5, 0x769188cc, 0x55a0a2f3, 0x58abacfa, 0x4fb6bee1, 0x42bdb0e8, 0x09d4ea9f, 0x04dfe496, 0x13c2f68d, 0x1ec9f884, 0x3df8d2bb, 0x30f3dcb2, 0x27eecea9, 0x2ae5c0a0, 0xb13c7a47, 0xbc37744e, 0xab2a6655, 0xa621685c, 0x85104263, 0x881b4c6a, 0x9f065e71, 0x920d5078, 0xd9640a0f, 0xd46f0406, 0xc372161d, 0xce791814, 0xed48322b, 0xe0433c22, 0xf75e2e39, 0xfa552030, 0xb701ec9a, 0xba0ae293, 0xad17f088, 0xa01cfe81, 0x832dd4be, 0x8e26dab7, 0x993bc8ac, 0x9430c6a5, 0xdf599cd2, 0xd25292db, 0xc54f80c0, 0xc8448ec9, 0xeb75a4f6, 0xe67eaaff, 0xf163b8e4, 0xfc68b6ed, 0x67b10c0a, 0x6aba0203, 0x7da71018, 0x70ac1e11, 0x539d342e, 0x5e963a27, 0x498b283c, 0x44802635, 0x0fe97c42, 0x02e2724b, 0x15ff6050, 0x18f46e59, 0x3bc54466, 0x36ce4a6f, 0x21d35874, 0x2cd8567d, 0x0c7a37a1, 0x017139a8, 0x166c2bb3, 0x1b6725ba, 0x38560f85, 0x355d018c, 0x22401397, 0x2f4b1d9e, 0x642247e9, 0x692949e0, 0x7e345bfb, 0x733f55f2, 0x500e7fcd, 0x5d0571c4, 0x4a1863df, 0x47136dd6, 0xdccad731, 0xd1c1d938, 0xc6dccb23, 0xcbd7c52a, 0xe8e6ef15, 0xe5ede11c, 0xf2f0f307, 0xfffbfd0e, 0xb492a779, 0xb999a970, 0xae84bb6b, 0xa38fb562, 0x80be9f5d, 0x8db59154, 0x9aa8834f, 0x97a38d46];
    var U4 = [0x00000000, 0x090d0b0e, 0x121a161c, 0x1b171d12, 0x24342c38, 0x2d392736, 0x362e3a24, 0x3f23312a, 0x48685870, 0x4165537e, 0x5a724e6c, 0x537f4562, 0x6c5c7448, 0x65517f46, 0x7e466254, 0x774b695a, 0x90d0b0e0, 0x99ddbbee, 0x82caa6fc, 0x8bc7adf2, 0xb4e49cd8, 0xbde997d6, 0xa6fe8ac4, 0xaff381ca, 0xd8b8e890, 0xd1b5e39e, 0xcaa2fe8c, 0xc3aff582, 0xfc8cc4a8, 0xf581cfa6, 0xee96d2b4, 0xe79bd9ba, 0x3bbb7bdb, 0x32b670d5, 0x29a16dc7, 0x20ac66c9, 0x1f8f57e3, 0x16825ced, 0x0d9541ff, 0x04984af1, 0x73d323ab, 0x7ade28a5, 0x61c935b7, 0x68c43eb9, 0x57e70f93, 0x5eea049d, 0x45fd198f, 0x4cf01281, 0xab6bcb3b, 0xa266c035, 0xb971dd27, 0xb07cd629, 0x8f5fe703, 0x8652ec0d, 0x9d45f11f, 0x9448fa11, 0xe303934b, 0xea0e9845, 0xf1198557, 0xf8148e59, 0xc737bf73, 0xce3ab47d, 0xd52da96f, 0xdc20a261, 0x766df6ad, 0x7f60fda3, 0x6477e0b1, 0x6d7aebbf, 0x5259da95, 0x5b54d19b, 0x4043cc89, 0x494ec787, 0x3e05aedd, 0x3708a5d3, 0x2c1fb8c1, 0x2512b3cf, 0x1a3182e5, 0x133c89eb, 0x082b94f9, 0x01269ff7, 0xe6bd464d, 0xefb04d43, 0xf4a75051, 0xfdaa5b5f, 0xc2896a75, 0xcb84617b, 0xd0937c69, 0xd99e7767, 0xaed51e3d, 0xa7d81533, 0xbccf0821, 0xb5c2032f, 0x8ae13205, 0x83ec390b, 0x98fb2419, 0x91f62f17, 0x4dd68d76, 0x44db8678, 0x5fcc9b6a, 0x56c19064, 0x69e2a14e, 0x60efaa40, 0x7bf8b752, 0x72f5bc5c, 0x05bed506, 0x0cb3de08, 0x17a4c31a, 0x1ea9c814, 0x218af93e, 0x2887f230, 0x3390ef22, 0x3a9de42c, 0xdd063d96, 0xd40b3698, 0xcf1c2b8a, 0xc6112084, 0xf93211ae, 0xf03f1aa0, 0xeb2807b2, 0xe2250cbc, 0x956e65e6, 0x9c636ee8, 0x877473fa, 0x8e7978f4, 0xb15a49de, 0xb85742d0, 0xa3405fc2, 0xaa4d54cc, 0xecdaf741, 0xe5d7fc4f, 0xfec0e15d, 0xf7cdea53, 0xc8eedb79, 0xc1e3d077, 0xdaf4cd65, 0xd3f9c66b, 0xa4b2af31, 0xadbfa43f, 0xb6a8b92d, 0xbfa5b223, 0x80868309, 0x898b8807, 0x929c9515, 0x9b919e1b, 0x7c0a47a1, 0x75074caf, 0x6e1051bd, 0x671d5ab3, 0x583e6b99, 0x51336097, 0x4a247d85, 0x4329768b, 0x34621fd1, 0x3d6f14df, 0x267809cd, 0x2f7502c3, 0x105633e9, 0x195b38e7, 0x024c25f5, 0x0b412efb, 0xd7618c9a, 0xde6c8794, 0xc57b9a86, 0xcc769188, 0xf355a0a2, 0xfa58abac, 0xe14fb6be, 0xe842bdb0, 0x9f09d4ea, 0x9604dfe4, 0x8d13c2f6, 0x841ec9f8, 0xbb3df8d2, 0xb230f3dc, 0xa927eece, 0xa02ae5c0, 0x47b13c7a, 0x4ebc3774, 0x55ab2a66, 0x5ca62168, 0x63851042, 0x6a881b4c, 0x719f065e, 0x78920d50, 0x0fd9640a, 0x06d46f04, 0x1dc37216, 0x14ce7918, 0x2bed4832, 0x22e0433c, 0x39f75e2e, 0x30fa5520, 0x9ab701ec, 0x93ba0ae2, 0x88ad17f0, 0x81a01cfe, 0xbe832dd4, 0xb78e26da, 0xac993bc8, 0xa59430c6, 0xd2df599c, 0xdbd25292, 0xc0c54f80, 0xc9c8448e, 0xf6eb75a4, 0xffe67eaa, 0xe4f163b8, 0xedfc68b6, 0x0a67b10c, 0x036aba02, 0x187da710, 0x1170ac1e, 0x2e539d34, 0x275e963a, 0x3c498b28, 0x35448026, 0x420fe97c, 0x4b02e272, 0x5015ff60, 0x5918f46e, 0x663bc544, 0x6f36ce4a, 0x7421d358, 0x7d2cd856, 0xa10c7a37, 0xa8017139, 0xb3166c2b, 0xba1b6725, 0x8538560f, 0x8c355d01, 0x97224013, 0x9e2f4b1d, 0xe9642247, 0xe0692949, 0xfb7e345b, 0xf2733f55, 0xcd500e7f, 0xc45d0571, 0xdf4a1863, 0xd647136d, 0x31dccad7, 0x38d1c1d9, 0x23c6dccb, 0x2acbd7c5, 0x15e8e6ef, 0x1ce5ede1, 0x07f2f0f3, 0x0efffbfd, 0x79b492a7, 0x70b999a9, 0x6bae84bb, 0x62a38fb5, 0x5d80be9f, 0x548db591, 0x4f9aa883, 0x4697a38d];

    function convertToInt32(bytes) {
        var result = [];
        for (var i = 0; i < bytes.length; i += 4) {
            result.push(
                (bytes[i    ] << 24) |
                (bytes[i + 1] << 16) |
                (bytes[i + 2] <<  8) |
                 bytes[i + 3]
            );
        }
        return result;
    }

    var AES = function(key) {
        if (!(this instanceof AES)) {
            throw Error('AES must be instanitated with `new`');
        }

        Object.defineProperty(this, 'key', {
            value: coerceArray(key, true)
        });

        this._prepare();
    }


    AES.prototype._prepare = function() {

        var rounds = numberOfRounds[this.key.length];
        if (rounds == null) {
            throw new Error('invalid key size (must be 16, 24 or 32 bytes)');
        }

        // encryption round keys
        this._Ke = [];

        // decryption round keys
        this._Kd = [];

        for (var i = 0; i <= rounds; i++) {
            this._Ke.push([0, 0, 0, 0]);
            this._Kd.push([0, 0, 0, 0]);
        }

        var roundKeyCount = (rounds + 1) * 4;
        var KC = this.key.length / 4;

        // convert the key into ints
        var tk = convertToInt32(this.key);

        // copy values into round key arrays
        var index;
        for (var i = 0; i < KC; i++) {
            index = i >> 2;
            this._Ke[index][i % 4] = tk[i];
            this._Kd[rounds - index][i % 4] = tk[i];
        }

        // key expansion (fips-197 section 5.2)
        var rconpointer = 0;
        var t = KC, tt;
        while (t < roundKeyCount) {
            tt = tk[KC - 1];
            tk[0] ^= ((S[(tt >> 16) & 0xFF] << 24) ^
                      (S[(tt >>  8) & 0xFF] << 16) ^
                      (S[ tt        & 0xFF] <<  8) ^
                       S[(tt >> 24) & 0xFF]        ^
                      (rcon[rconpointer] << 24));
            rconpointer += 1;

            // key expansion (for non-256 bit)
            if (KC != 8) {
                for (var i = 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }

            // key expansion for 256-bit keys is "slightly different" (fips-197)
            } else {
                for (var i = 1; i < (KC / 2); i++) {
                    tk[i] ^= tk[i - 1];
                }
                tt = tk[(KC / 2) - 1];

                tk[KC / 2] ^= (S[ tt        & 0xFF]        ^
                              (S[(tt >>  8) & 0xFF] <<  8) ^
                              (S[(tt >> 16) & 0xFF] << 16) ^
                              (S[(tt >> 24) & 0xFF] << 24));

                for (var i = (KC / 2) + 1; i < KC; i++) {
                    tk[i] ^= tk[i - 1];
                }
            }

            // copy values into round key arrays
            var i = 0, r, c;
            while (i < KC && t < roundKeyCount) {
                r = t >> 2;
                c = t % 4;
                this._Ke[r][c] = tk[i];
                this._Kd[rounds - r][c] = tk[i++];
                t++;
            }
        }

        // inverse-cipher-ify the decryption round key (fips-197 section 5.3)
        for (var r = 1; r < rounds; r++) {
            for (var c = 0; c < 4; c++) {
                tt = this._Kd[r][c];
                this._Kd[r][c] = (U1[(tt >> 24) & 0xFF] ^
                                  U2[(tt >> 16) & 0xFF] ^
                                  U3[(tt >>  8) & 0xFF] ^
                                  U4[ tt        & 0xFF]);
            }
        }
    }

    AES.prototype.encrypt = function(plaintext) {
        if (plaintext.length != 16) {
            throw new Error('invalid plaintext size (must be 16 bytes)');
        }

        var rounds = this._Ke.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(plaintext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Ke[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T1[(t[ i         ] >> 24) & 0xff] ^
                        T2[(t[(i + 1) % 4] >> 16) & 0xff] ^
                        T3[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T4[ t[(i + 3) % 4]        & 0xff] ^
                        this._Ke[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Ke[rounds][i];
            result[4 * i    ] = (S[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (S[(t[(i + 1) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (S[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (S[ t[(i + 3) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }

    AES.prototype.decrypt = function(ciphertext) {
        if (ciphertext.length != 16) {
            throw new Error('invalid ciphertext size (must be 16 bytes)');
        }

        var rounds = this._Kd.length - 1;
        var a = [0, 0, 0, 0];

        // convert plaintext to (ints ^ key)
        var t = convertToInt32(ciphertext);
        for (var i = 0; i < 4; i++) {
            t[i] ^= this._Kd[0][i];
        }

        // apply round transforms
        for (var r = 1; r < rounds; r++) {
            for (var i = 0; i < 4; i++) {
                a[i] = (T5[(t[ i          ] >> 24) & 0xff] ^
                        T6[(t[(i + 3) % 4] >> 16) & 0xff] ^
                        T7[(t[(i + 2) % 4] >>  8) & 0xff] ^
                        T8[ t[(i + 1) % 4]        & 0xff] ^
                        this._Kd[r][i]);
            }
            t = a.slice();
        }

        // the last round is special
        var result = createArray(16), tt;
        for (var i = 0; i < 4; i++) {
            tt = this._Kd[rounds][i];
            result[4 * i    ] = (Si[(t[ i         ] >> 24) & 0xff] ^ (tt >> 24)) & 0xff;
            result[4 * i + 1] = (Si[(t[(i + 3) % 4] >> 16) & 0xff] ^ (tt >> 16)) & 0xff;
            result[4 * i + 2] = (Si[(t[(i + 2) % 4] >>  8) & 0xff] ^ (tt >>  8)) & 0xff;
            result[4 * i + 3] = (Si[ t[(i + 1) % 4]        & 0xff] ^  tt       ) & 0xff;
        }

        return result;
    }


    /**
     *  Mode Of Operation - Electonic Codebook (ECB)
     */
    var ModeOfOperationECB = function(key) {
        if (!(this instanceof ModeOfOperationECB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Electronic Code Block";
        this.name = "ecb";

        this._aes = new AES(key);
    }

    ModeOfOperationECB.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);
            block = this._aes.encrypt(block);
            copyArray(block, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationECB.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);
            copyArray(block, plaintext, i);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Block Chaining (CBC)
     */
    var ModeOfOperationCBC = function(key, iv) {
        if (!(this instanceof ModeOfOperationCBC)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Block Chaining";
        this.name = "cbc";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastCipherblock = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCBC.prototype.encrypt = function(plaintext) {
        plaintext = coerceArray(plaintext);

        if ((plaintext.length % 16) !== 0) {
            throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
        }

        var ciphertext = createArray(plaintext.length);
        var block = createArray(16);

        for (var i = 0; i < plaintext.length; i += 16) {
            copyArray(plaintext, block, 0, i, i + 16);

            for (var j = 0; j < 16; j++) {
                block[j] ^= this._lastCipherblock[j];
            }

            this._lastCipherblock = this._aes.encrypt(block);
            copyArray(this._lastCipherblock, ciphertext, i);
        }

        return ciphertext;
    }

    ModeOfOperationCBC.prototype.decrypt = function(ciphertext) {
        ciphertext = coerceArray(ciphertext);

        if ((ciphertext.length % 16) !== 0) {
            throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
        }

        var plaintext = createArray(ciphertext.length);
        var block = createArray(16);

        for (var i = 0; i < ciphertext.length; i += 16) {
            copyArray(ciphertext, block, 0, i, i + 16);
            block = this._aes.decrypt(block);

            for (var j = 0; j < 16; j++) {
                plaintext[i + j] = block[j] ^ this._lastCipherblock[j];
            }

            copyArray(ciphertext, this._lastCipherblock, 0, i, i + 16);
        }

        return plaintext;
    }


    /**
     *  Mode Of Operation - Cipher Feedback (CFB)
     */
    var ModeOfOperationCFB = function(key, iv, segmentSize) {
        if (!(this instanceof ModeOfOperationCFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Cipher Feedback";
        this.name = "cfb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 size)');
        }

        if (!segmentSize) { segmentSize = 1; }

        this.segmentSize = segmentSize;

        this._shiftRegister = coerceArray(iv, true);

        this._aes = new AES(key);
    }

    ModeOfOperationCFB.prototype.encrypt = function(plaintext) {
        if ((plaintext.length % this.segmentSize) != 0) {
            throw new Error('invalid plaintext size (must be segmentSize bytes)');
        }

        var encrypted = coerceArray(plaintext, true);

        var xorSegment;
        for (var i = 0; i < encrypted.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);
            for (var j = 0; j < this.segmentSize; j++) {
                encrypted[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(encrypted, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return encrypted;
    }

    ModeOfOperationCFB.prototype.decrypt = function(ciphertext) {
        if ((ciphertext.length % this.segmentSize) != 0) {
            throw new Error('invalid ciphertext size (must be segmentSize bytes)');
        }

        var plaintext = coerceArray(ciphertext, true);

        var xorSegment;
        for (var i = 0; i < plaintext.length; i += this.segmentSize) {
            xorSegment = this._aes.encrypt(this._shiftRegister);

            for (var j = 0; j < this.segmentSize; j++) {
                plaintext[i + j] ^= xorSegment[j];
            }

            // Shift the register
            copyArray(this._shiftRegister, this._shiftRegister, 0, this.segmentSize);
            copyArray(ciphertext, this._shiftRegister, 16 - this.segmentSize, i, i + this.segmentSize);
        }

        return plaintext;
    }

    /**
     *  Mode Of Operation - Output Feedback (OFB)
     */
    var ModeOfOperationOFB = function(key, iv) {
        if (!(this instanceof ModeOfOperationOFB)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Output Feedback";
        this.name = "ofb";

        if (!iv) {
            iv = createArray(16);

        } else if (iv.length != 16) {
            throw new Error('invalid initialation vector size (must be 16 bytes)');
        }

        this._lastPrecipher = coerceArray(iv, true);
        this._lastPrecipherIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationOFB.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._lastPrecipherIndex === 16) {
                this._lastPrecipher = this._aes.encrypt(this._lastPrecipher);
                this._lastPrecipherIndex = 0;
            }
            encrypted[i] ^= this._lastPrecipher[this._lastPrecipherIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationOFB.prototype.decrypt = ModeOfOperationOFB.prototype.encrypt;


    /**
     *  Counter object for CTR common mode of operation
     */
    var Counter = function(initialValue) {
        if (!(this instanceof Counter)) {
            throw Error('Counter must be instanitated with `new`');
        }

        // We allow 0, but anything false-ish uses the default 1
        if (initialValue !== 0 && !initialValue) { initialValue = 1; }

        if (typeof(initialValue) === 'number') {
            this._counter = createArray(16);
            this.setValue(initialValue);

        } else {
            this.setBytes(initialValue);
        }
    }

    Counter.prototype.setValue = function(value) {
        if (typeof(value) !== 'number' || parseInt(value) != value) {
            throw new Error('invalid counter value (must be an integer)');
        }

        // We cannot safely handle numbers beyond the safe range for integers
        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error('integer value out of safe range');
        }

        for (var index = 15; index >= 0; --index) {
            this._counter[index] = value % 256;
            value = parseInt(value / 256);
        }
    }

    Counter.prototype.setBytes = function(bytes) {
        bytes = coerceArray(bytes, true);

        if (bytes.length != 16) {
            throw new Error('invalid counter bytes size (must be 16 bytes)');
        }

        this._counter = bytes;
    };

    Counter.prototype.increment = function() {
        for (var i = 15; i >= 0; i--) {
            if (this._counter[i] === 255) {
                this._counter[i] = 0;
            } else {
                this._counter[i]++;
                break;
            }
        }
    }


    /**
     *  Mode Of Operation - Counter (CTR)
     */
    var ModeOfOperationCTR = function(key, counter) {
        if (!(this instanceof ModeOfOperationCTR)) {
            throw Error('AES must be instanitated with `new`');
        }

        this.description = "Counter";
        this.name = "ctr";

        if (!(counter instanceof Counter)) {
            counter = new Counter(counter)
        }

        this._counter = counter;

        this._remainingCounter = null;
        this._remainingCounterIndex = 16;

        this._aes = new AES(key);
    }

    ModeOfOperationCTR.prototype.encrypt = function(plaintext) {
        var encrypted = coerceArray(plaintext, true);

        for (var i = 0; i < encrypted.length; i++) {
            if (this._remainingCounterIndex === 16) {
                this._remainingCounter = this._aes.encrypt(this._counter._counter);
                this._remainingCounterIndex = 0;
                this._counter.increment();
            }
            encrypted[i] ^= this._remainingCounter[this._remainingCounterIndex++];
        }

        return encrypted;
    }

    // Decryption is symetric
    ModeOfOperationCTR.prototype.decrypt = ModeOfOperationCTR.prototype.encrypt;


    ///////////////////////
    // Padding

    // See:https://tools.ietf.org/html/rfc2315
    function pkcs7pad(data) {
        data = coerceArray(data, true);
        var padder = 16 - (data.length % 16);
        var result = createArray(data.length + padder);
        copyArray(data, result);
        for (var i = data.length; i < result.length; i++) {
            result[i] = padder;
        }
        return result;
    }

    function pkcs7strip(data) {
        data = coerceArray(data, true);
        if (data.length < 16) { throw new Error('PKCS#7 invalid length'); }

        var padder = data[data.length - 1];
        if (padder > 16) { throw new Error('PKCS#7 padding byte out of range'); }

        var length = data.length - padder;
        for (var i = 0; i < padder; i++) {
            if (data[length + i] !== padder) {
                throw new Error('PKCS#7 invalid padding byte');
            }
        }

        var result = createArray(length);
        copyArray(data, result, 0, 0, length);
        return result;
    }

    ///////////////////////
    // Exporting


    // The block cipher
    var aesjs = {
        AES: AES,
        Counter: Counter,

        ModeOfOperation: {
            ecb: ModeOfOperationECB,
            cbc: ModeOfOperationCBC,
            cfb: ModeOfOperationCFB,
            ofb: ModeOfOperationOFB,
            ctr: ModeOfOperationCTR
        },

        utils: {
            hex: convertHex,
            utf8: convertUtf8
        },

        padding: {
            pkcs7: {
                pad: pkcs7pad,
                strip: pkcs7strip
            }
        },

        _arrayTest: {
            coerceArray: coerceArray,
            createArray: createArray,
            copyArray: copyArray,
        }
    };


    // node.js
    if (true) {
        module.exports = aesjs

    // RequireJS/AMD
    // http://www.requirejs.org/docs/api.html
    // https://github.com/amdjs/amdjs-api/wiki/AMD
    } else {}


})(this);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy92ZW5kb3Jzfm1vZHVsZS0xMi5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL25vZGVfbW9kdWxlcy9hZXMtanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohIE1JVCBMaWNlbnNlLiBDb3B5cmlnaHQgMjAxNS0yMDE4IFJpY2hhcmQgTW9vcmUgPG1lQHJpY21vby5jb20+LiBTZWUgTElDRU5TRS50eHQuICovXG4oZnVuY3Rpb24ocm9vdCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgZnVuY3Rpb24gY2hlY2tJbnQodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIChwYXJzZUludCh2YWx1ZSkgPT09IHZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0ludHMoYXJyYXlpc2gpIHtcbiAgICAgICAgaWYgKCFjaGVja0ludChhcnJheWlzaC5sZW5ndGgpKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlpc2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghY2hlY2tJbnQoYXJyYXlpc2hbaV0pIHx8IGFycmF5aXNoW2ldIDwgMCB8fCBhcnJheWlzaFtpXSA+IDI1NSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvZXJjZUFycmF5KGFyZywgY29weSkge1xuXG4gICAgICAgIC8vIEFycmF5QnVmZmVyIHZpZXdcbiAgICAgICAgaWYgKGFyZy5idWZmZXIgJiYgYXJnLm5hbWUgPT09ICdVaW50OEFycmF5Jykge1xuXG4gICAgICAgICAgICBpZiAoY29weSkge1xuICAgICAgICAgICAgICAgIGlmIChhcmcuc2xpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJdCdzIGFuIGFycmF5OyBjaGVjayBpdCBpcyBhIHZhbGlkIHJlcHJlc2VudGF0aW9uIG9mIGEgYnl0ZVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG4gICAgICAgICAgICBpZiAoIWNoZWNrSW50cyhhcmcpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdBcnJheSBjb250YWlucyBpbnZhbGlkIHZhbHVlOiAnICsgYXJnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb21ldGhpbmcgZWxzZSwgYnV0IGJlaGF2ZXMgbGlrZSBhbiBhcnJheSAobWF5YmUgYSBCdWZmZXI/IEFyZ3VtZW50cz8pXG4gICAgICAgIGlmIChjaGVja0ludChhcmcubGVuZ3RoKSAmJiBjaGVja0ludHMoYXJnKSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KGFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIGFycmF5LWxpa2Ugb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQXJyYXkobGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShsZW5ndGgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2VBcnJheSwgdGFyZ2V0QXJyYXksIHRhcmdldFN0YXJ0LCBzb3VyY2VTdGFydCwgc291cmNlRW5kKSB7XG4gICAgICAgIGlmIChzb3VyY2VTdGFydCAhPSBudWxsIHx8IHNvdXJjZUVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAoc291cmNlQXJyYXkuc2xpY2UpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VBcnJheSA9IHNvdXJjZUFycmF5LnNsaWNlKHNvdXJjZVN0YXJ0LCBzb3VyY2VFbmQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNvdXJjZUFycmF5LCBzb3VyY2VTdGFydCwgc291cmNlRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0YXJnZXRBcnJheS5zZXQoc291cmNlQXJyYXksIHRhcmdldFN0YXJ0KTtcbiAgICB9XG5cblxuXG4gICAgdmFyIGNvbnZlcnRVdGY4ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBmdW5jdGlvbiB0b0J5dGVzKHRleHQpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBbXSwgaSA9IDA7XG4gICAgICAgICAgICB0ZXh0ID0gZW5jb2RlVVJJKHRleHQpO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCB0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjID0gdGV4dC5jaGFyQ29kZUF0KGkrKyk7XG5cbiAgICAgICAgICAgICAgICAvLyBpZiBpdCBpcyBhICUgc2lnbiwgZW5jb2RlIHRoZSBmb2xsb3dpbmcgMiBieXRlcyBhcyBhIGhleCB2YWx1ZVxuICAgICAgICAgICAgICAgIGlmIChjID09PSAzNykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwYXJzZUludCh0ZXh0LnN1YnN0cihpLCAyKSwgMTYpKVxuICAgICAgICAgICAgICAgICAgICBpICs9IDI7XG5cbiAgICAgICAgICAgICAgICAvLyBvdGhlcndpc2UsIGp1c3QgdGhlIGFjdHVhbCBieXRlXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb2VyY2VBcnJheShyZXN1bHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZnJvbUJ5dGVzKGJ5dGVzKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW10sIGkgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZSAoaSA8IGJ5dGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBjID0gYnl0ZXNbaV07XG5cbiAgICAgICAgICAgICAgICBpZiAoYyA8IDEyOCkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGMpKTtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYyA+IDE5MSAmJiBjIDwgMjI0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMHgxZikgPDwgNikgfCAoYnl0ZXNbaSArIDFdICYgMHgzZikpKTtcbiAgICAgICAgICAgICAgICAgICAgaSArPSAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoKChjICYgMHgwZikgPDwgMTIpIHwgKChieXRlc1tpICsgMV0gJiAweDNmKSA8PCA2KSB8IChieXRlc1tpICsgMl0gJiAweDNmKSkpO1xuICAgICAgICAgICAgICAgICAgICBpICs9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmpvaW4oJycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRvQnl0ZXM6IHRvQnl0ZXMsXG4gICAgICAgICAgICBmcm9tQnl0ZXM6IGZyb21CeXRlcyxcbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICB2YXIgY29udmVydEhleCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gdG9CeXRlcyh0ZXh0KSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChwYXJzZUludCh0ZXh0LnN1YnN0cihpLCAyKSwgMTYpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGh0dHA6Ly9peHRpLm5ldC9kZXZlbG9wbWVudC9qYXZhc2NyaXB0LzIwMTEvMTEvMTEvYmFzZTY0LWVuY29kZWRlY29kZS1vZi11dGY4LWluLWJyb3dzZXItd2l0aC1qcy5odG1sXG4gICAgICAgIHZhciBIZXggPSAnMDEyMzQ1Njc4OWFiY2RlZic7XG5cbiAgICAgICAgZnVuY3Rpb24gZnJvbUJ5dGVzKGJ5dGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBieXRlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goSGV4Wyh2ICYgMHhmMCkgPj4gNF0gKyBIZXhbdiAmIDB4MGZdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5qb2luKCcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b0J5dGVzOiB0b0J5dGVzLFxuICAgICAgICAgICAgZnJvbUJ5dGVzOiBmcm9tQnl0ZXMsXG4gICAgICAgIH1cbiAgICB9KSgpO1xuXG5cbiAgICAvLyBOdW1iZXIgb2Ygcm91bmRzIGJ5IGtleXNpemVcbiAgICB2YXIgbnVtYmVyT2ZSb3VuZHMgPSB7MTY6IDEwLCAyNDogMTIsIDMyOiAxNH1cblxuICAgIC8vIFJvdW5kIGNvbnN0YW50IHdvcmRzXG4gICAgdmFyIHJjb24gPSBbMHgwMSwgMHgwMiwgMHgwNCwgMHgwOCwgMHgxMCwgMHgyMCwgMHg0MCwgMHg4MCwgMHgxYiwgMHgzNiwgMHg2YywgMHhkOCwgMHhhYiwgMHg0ZCwgMHg5YSwgMHgyZiwgMHg1ZSwgMHhiYywgMHg2MywgMHhjNiwgMHg5NywgMHgzNSwgMHg2YSwgMHhkNCwgMHhiMywgMHg3ZCwgMHhmYSwgMHhlZiwgMHhjNSwgMHg5MV07XG5cbiAgICAvLyBTLWJveCBhbmQgSW52ZXJzZSBTLWJveCAoUyBpcyBmb3IgU3Vic3RpdHV0aW9uKVxuICAgIHZhciBTID0gWzB4NjMsIDB4N2MsIDB4NzcsIDB4N2IsIDB4ZjIsIDB4NmIsIDB4NmYsIDB4YzUsIDB4MzAsIDB4MDEsIDB4NjcsIDB4MmIsIDB4ZmUsIDB4ZDcsIDB4YWIsIDB4NzYsIDB4Y2EsIDB4ODIsIDB4YzksIDB4N2QsIDB4ZmEsIDB4NTksIDB4NDcsIDB4ZjAsIDB4YWQsIDB4ZDQsIDB4YTIsIDB4YWYsIDB4OWMsIDB4YTQsIDB4NzIsIDB4YzAsIDB4YjcsIDB4ZmQsIDB4OTMsIDB4MjYsIDB4MzYsIDB4M2YsIDB4ZjcsIDB4Y2MsIDB4MzQsIDB4YTUsIDB4ZTUsIDB4ZjEsIDB4NzEsIDB4ZDgsIDB4MzEsIDB4MTUsIDB4MDQsIDB4YzcsIDB4MjMsIDB4YzMsIDB4MTgsIDB4OTYsIDB4MDUsIDB4OWEsIDB4MDcsIDB4MTIsIDB4ODAsIDB4ZTIsIDB4ZWIsIDB4MjcsIDB4YjIsIDB4NzUsIDB4MDksIDB4ODMsIDB4MmMsIDB4MWEsIDB4MWIsIDB4NmUsIDB4NWEsIDB4YTAsIDB4NTIsIDB4M2IsIDB4ZDYsIDB4YjMsIDB4MjksIDB4ZTMsIDB4MmYsIDB4ODQsIDB4NTMsIDB4ZDEsIDB4MDAsIDB4ZWQsIDB4MjAsIDB4ZmMsIDB4YjEsIDB4NWIsIDB4NmEsIDB4Y2IsIDB4YmUsIDB4MzksIDB4NGEsIDB4NGMsIDB4NTgsIDB4Y2YsIDB4ZDAsIDB4ZWYsIDB4YWEsIDB4ZmIsIDB4NDMsIDB4NGQsIDB4MzMsIDB4ODUsIDB4NDUsIDB4ZjksIDB4MDIsIDB4N2YsIDB4NTAsIDB4M2MsIDB4OWYsIDB4YTgsIDB4NTEsIDB4YTMsIDB4NDAsIDB4OGYsIDB4OTIsIDB4OWQsIDB4MzgsIDB4ZjUsIDB4YmMsIDB4YjYsIDB4ZGEsIDB4MjEsIDB4MTAsIDB4ZmYsIDB4ZjMsIDB4ZDIsIDB4Y2QsIDB4MGMsIDB4MTMsIDB4ZWMsIDB4NWYsIDB4OTcsIDB4NDQsIDB4MTcsIDB4YzQsIDB4YTcsIDB4N2UsIDB4M2QsIDB4NjQsIDB4NWQsIDB4MTksIDB4NzMsIDB4NjAsIDB4ODEsIDB4NGYsIDB4ZGMsIDB4MjIsIDB4MmEsIDB4OTAsIDB4ODgsIDB4NDYsIDB4ZWUsIDB4YjgsIDB4MTQsIDB4ZGUsIDB4NWUsIDB4MGIsIDB4ZGIsIDB4ZTAsIDB4MzIsIDB4M2EsIDB4MGEsIDB4NDksIDB4MDYsIDB4MjQsIDB4NWMsIDB4YzIsIDB4ZDMsIDB4YWMsIDB4NjIsIDB4OTEsIDB4OTUsIDB4ZTQsIDB4NzksIDB4ZTcsIDB4YzgsIDB4MzcsIDB4NmQsIDB4OGQsIDB4ZDUsIDB4NGUsIDB4YTksIDB4NmMsIDB4NTYsIDB4ZjQsIDB4ZWEsIDB4NjUsIDB4N2EsIDB4YWUsIDB4MDgsIDB4YmEsIDB4NzgsIDB4MjUsIDB4MmUsIDB4MWMsIDB4YTYsIDB4YjQsIDB4YzYsIDB4ZTgsIDB4ZGQsIDB4NzQsIDB4MWYsIDB4NGIsIDB4YmQsIDB4OGIsIDB4OGEsIDB4NzAsIDB4M2UsIDB4YjUsIDB4NjYsIDB4NDgsIDB4MDMsIDB4ZjYsIDB4MGUsIDB4NjEsIDB4MzUsIDB4NTcsIDB4YjksIDB4ODYsIDB4YzEsIDB4MWQsIDB4OWUsIDB4ZTEsIDB4ZjgsIDB4OTgsIDB4MTEsIDB4NjksIDB4ZDksIDB4OGUsIDB4OTQsIDB4OWIsIDB4MWUsIDB4ODcsIDB4ZTksIDB4Y2UsIDB4NTUsIDB4MjgsIDB4ZGYsIDB4OGMsIDB4YTEsIDB4ODksIDB4MGQsIDB4YmYsIDB4ZTYsIDB4NDIsIDB4NjgsIDB4NDEsIDB4OTksIDB4MmQsIDB4MGYsIDB4YjAsIDB4NTQsIDB4YmIsIDB4MTZdO1xuICAgIHZhciBTaSA9WzB4NTIsIDB4MDksIDB4NmEsIDB4ZDUsIDB4MzAsIDB4MzYsIDB4YTUsIDB4MzgsIDB4YmYsIDB4NDAsIDB4YTMsIDB4OWUsIDB4ODEsIDB4ZjMsIDB4ZDcsIDB4ZmIsIDB4N2MsIDB4ZTMsIDB4MzksIDB4ODIsIDB4OWIsIDB4MmYsIDB4ZmYsIDB4ODcsIDB4MzQsIDB4OGUsIDB4NDMsIDB4NDQsIDB4YzQsIDB4ZGUsIDB4ZTksIDB4Y2IsIDB4NTQsIDB4N2IsIDB4OTQsIDB4MzIsIDB4YTYsIDB4YzIsIDB4MjMsIDB4M2QsIDB4ZWUsIDB4NGMsIDB4OTUsIDB4MGIsIDB4NDIsIDB4ZmEsIDB4YzMsIDB4NGUsIDB4MDgsIDB4MmUsIDB4YTEsIDB4NjYsIDB4MjgsIDB4ZDksIDB4MjQsIDB4YjIsIDB4NzYsIDB4NWIsIDB4YTIsIDB4NDksIDB4NmQsIDB4OGIsIDB4ZDEsIDB4MjUsIDB4NzIsIDB4ZjgsIDB4ZjYsIDB4NjQsIDB4ODYsIDB4NjgsIDB4OTgsIDB4MTYsIDB4ZDQsIDB4YTQsIDB4NWMsIDB4Y2MsIDB4NWQsIDB4NjUsIDB4YjYsIDB4OTIsIDB4NmMsIDB4NzAsIDB4NDgsIDB4NTAsIDB4ZmQsIDB4ZWQsIDB4YjksIDB4ZGEsIDB4NWUsIDB4MTUsIDB4NDYsIDB4NTcsIDB4YTcsIDB4OGQsIDB4OWQsIDB4ODQsIDB4OTAsIDB4ZDgsIDB4YWIsIDB4MDAsIDB4OGMsIDB4YmMsIDB4ZDMsIDB4MGEsIDB4ZjcsIDB4ZTQsIDB4NTgsIDB4MDUsIDB4YjgsIDB4YjMsIDB4NDUsIDB4MDYsIDB4ZDAsIDB4MmMsIDB4MWUsIDB4OGYsIDB4Y2EsIDB4M2YsIDB4MGYsIDB4MDIsIDB4YzEsIDB4YWYsIDB4YmQsIDB4MDMsIDB4MDEsIDB4MTMsIDB4OGEsIDB4NmIsIDB4M2EsIDB4OTEsIDB4MTEsIDB4NDEsIDB4NGYsIDB4NjcsIDB4ZGMsIDB4ZWEsIDB4OTcsIDB4ZjIsIDB4Y2YsIDB4Y2UsIDB4ZjAsIDB4YjQsIDB4ZTYsIDB4NzMsIDB4OTYsIDB4YWMsIDB4NzQsIDB4MjIsIDB4ZTcsIDB4YWQsIDB4MzUsIDB4ODUsIDB4ZTIsIDB4ZjksIDB4MzcsIDB4ZTgsIDB4MWMsIDB4NzUsIDB4ZGYsIDB4NmUsIDB4NDcsIDB4ZjEsIDB4MWEsIDB4NzEsIDB4MWQsIDB4MjksIDB4YzUsIDB4ODksIDB4NmYsIDB4YjcsIDB4NjIsIDB4MGUsIDB4YWEsIDB4MTgsIDB4YmUsIDB4MWIsIDB4ZmMsIDB4NTYsIDB4M2UsIDB4NGIsIDB4YzYsIDB4ZDIsIDB4NzksIDB4MjAsIDB4OWEsIDB4ZGIsIDB4YzAsIDB4ZmUsIDB4NzgsIDB4Y2QsIDB4NWEsIDB4ZjQsIDB4MWYsIDB4ZGQsIDB4YTgsIDB4MzMsIDB4ODgsIDB4MDcsIDB4YzcsIDB4MzEsIDB4YjEsIDB4MTIsIDB4MTAsIDB4NTksIDB4MjcsIDB4ODAsIDB4ZWMsIDB4NWYsIDB4NjAsIDB4NTEsIDB4N2YsIDB4YTksIDB4MTksIDB4YjUsIDB4NGEsIDB4MGQsIDB4MmQsIDB4ZTUsIDB4N2EsIDB4OWYsIDB4OTMsIDB4YzksIDB4OWMsIDB4ZWYsIDB4YTAsIDB4ZTAsIDB4M2IsIDB4NGQsIDB4YWUsIDB4MmEsIDB4ZjUsIDB4YjAsIDB4YzgsIDB4ZWIsIDB4YmIsIDB4M2MsIDB4ODMsIDB4NTMsIDB4OTksIDB4NjEsIDB4MTcsIDB4MmIsIDB4MDQsIDB4N2UsIDB4YmEsIDB4NzcsIDB4ZDYsIDB4MjYsIDB4ZTEsIDB4NjksIDB4MTQsIDB4NjMsIDB4NTUsIDB4MjEsIDB4MGMsIDB4N2RdO1xuXG4gICAgLy8gVHJhbnNmb3JtYXRpb25zIGZvciBlbmNyeXB0aW9uXG4gICAgdmFyIFQxID0gWzB4YzY2MzYzYTUsIDB4Zjg3YzdjODQsIDB4ZWU3Nzc3OTksIDB4ZjY3YjdiOGQsIDB4ZmZmMmYyMGQsIDB4ZDY2YjZiYmQsIDB4ZGU2ZjZmYjEsIDB4OTFjNWM1NTQsIDB4NjAzMDMwNTAsIDB4MDIwMTAxMDMsIDB4Y2U2NzY3YTksIDB4NTYyYjJiN2QsIDB4ZTdmZWZlMTksIDB4YjVkN2Q3NjIsIDB4NGRhYmFiZTYsIDB4ZWM3Njc2OWEsIDB4OGZjYWNhNDUsIDB4MWY4MjgyOWQsIDB4ODljOWM5NDAsIDB4ZmE3ZDdkODcsIDB4ZWZmYWZhMTUsIDB4YjI1OTU5ZWIsIDB4OGU0NzQ3YzksIDB4ZmJmMGYwMGIsIDB4NDFhZGFkZWMsIDB4YjNkNGQ0NjcsIDB4NWZhMmEyZmQsIDB4NDVhZmFmZWEsIDB4MjM5YzljYmYsIDB4NTNhNGE0ZjcsIDB4ZTQ3MjcyOTYsIDB4OWJjMGMwNWIsIDB4NzViN2I3YzIsIDB4ZTFmZGZkMWMsIDB4M2Q5MzkzYWUsIDB4NGMyNjI2NmEsIDB4NmMzNjM2NWEsIDB4N2UzZjNmNDEsIDB4ZjVmN2Y3MDIsIDB4ODNjY2NjNGYsIDB4NjgzNDM0NWMsIDB4NTFhNWE1ZjQsIDB4ZDFlNWU1MzQsIDB4ZjlmMWYxMDgsIDB4ZTI3MTcxOTMsIDB4YWJkOGQ4NzMsIDB4NjIzMTMxNTMsIDB4MmExNTE1M2YsIDB4MDgwNDA0MGMsIDB4OTVjN2M3NTIsIDB4NDYyMzIzNjUsIDB4OWRjM2MzNWUsIDB4MzAxODE4MjgsIDB4Mzc5Njk2YTEsIDB4MGEwNTA1MGYsIDB4MmY5YTlhYjUsIDB4MGUwNzA3MDksIDB4MjQxMjEyMzYsIDB4MWI4MDgwOWIsIDB4ZGZlMmUyM2QsIDB4Y2RlYmViMjYsIDB4NGUyNzI3NjksIDB4N2ZiMmIyY2QsIDB4ZWE3NTc1OWYsIDB4MTIwOTA5MWIsIDB4MWQ4MzgzOWUsIDB4NTgyYzJjNzQsIDB4MzQxYTFhMmUsIDB4MzYxYjFiMmQsIDB4ZGM2ZTZlYjIsIDB4YjQ1YTVhZWUsIDB4NWJhMGEwZmIsIDB4YTQ1MjUyZjYsIDB4NzYzYjNiNGQsIDB4YjdkNmQ2NjEsIDB4N2RiM2IzY2UsIDB4NTIyOTI5N2IsIDB4ZGRlM2UzM2UsIDB4NWUyZjJmNzEsIDB4MTM4NDg0OTcsIDB4YTY1MzUzZjUsIDB4YjlkMWQxNjgsIDB4MDAwMDAwMDAsIDB4YzFlZGVkMmMsIDB4NDAyMDIwNjAsIDB4ZTNmY2ZjMWYsIDB4NzliMWIxYzgsIDB4YjY1YjViZWQsIDB4ZDQ2YTZhYmUsIDB4OGRjYmNiNDYsIDB4NjdiZWJlZDksIDB4NzIzOTM5NGIsIDB4OTQ0YTRhZGUsIDB4OTg0YzRjZDQsIDB4YjA1ODU4ZTgsIDB4ODVjZmNmNGEsIDB4YmJkMGQwNmIsIDB4YzVlZmVmMmEsIDB4NGZhYWFhZTUsIDB4ZWRmYmZiMTYsIDB4ODY0MzQzYzUsIDB4OWE0ZDRkZDcsIDB4NjYzMzMzNTUsIDB4MTE4NTg1OTQsIDB4OGE0NTQ1Y2YsIDB4ZTlmOWY5MTAsIDB4MDQwMjAyMDYsIDB4ZmU3ZjdmODEsIDB4YTA1MDUwZjAsIDB4NzgzYzNjNDQsIDB4MjU5ZjlmYmEsIDB4NGJhOGE4ZTMsIDB4YTI1MTUxZjMsIDB4NWRhM2EzZmUsIDB4ODA0MDQwYzAsIDB4MDU4ZjhmOGEsIDB4M2Y5MjkyYWQsIDB4MjE5ZDlkYmMsIDB4NzAzODM4NDgsIDB4ZjFmNWY1MDQsIDB4NjNiY2JjZGYsIDB4NzdiNmI2YzEsIDB4YWZkYWRhNzUsIDB4NDIyMTIxNjMsIDB4MjAxMDEwMzAsIDB4ZTVmZmZmMWEsIDB4ZmRmM2YzMGUsIDB4YmZkMmQyNmQsIDB4ODFjZGNkNGMsIDB4MTgwYzBjMTQsIDB4MjYxMzEzMzUsIDB4YzNlY2VjMmYsIDB4YmU1ZjVmZTEsIDB4MzU5Nzk3YTIsIDB4ODg0NDQ0Y2MsIDB4MmUxNzE3MzksIDB4OTNjNGM0NTcsIDB4NTVhN2E3ZjIsIDB4ZmM3ZTdlODIsIDB4N2EzZDNkNDcsIDB4Yzg2NDY0YWMsIDB4YmE1ZDVkZTcsIDB4MzIxOTE5MmIsIDB4ZTY3MzczOTUsIDB4YzA2MDYwYTAsIDB4MTk4MTgxOTgsIDB4OWU0ZjRmZDEsIDB4YTNkY2RjN2YsIDB4NDQyMjIyNjYsIDB4NTQyYTJhN2UsIDB4M2I5MDkwYWIsIDB4MGI4ODg4ODMsIDB4OGM0NjQ2Y2EsIDB4YzdlZWVlMjksIDB4NmJiOGI4ZDMsIDB4MjgxNDE0M2MsIDB4YTdkZWRlNzksIDB4YmM1ZTVlZTIsIDB4MTYwYjBiMWQsIDB4YWRkYmRiNzYsIDB4ZGJlMGUwM2IsIDB4NjQzMjMyNTYsIDB4NzQzYTNhNGUsIDB4MTQwYTBhMWUsIDB4OTI0OTQ5ZGIsIDB4MGMwNjA2MGEsIDB4NDgyNDI0NmMsIDB4Yjg1YzVjZTQsIDB4OWZjMmMyNWQsIDB4YmRkM2QzNmUsIDB4NDNhY2FjZWYsIDB4YzQ2MjYyYTYsIDB4Mzk5MTkxYTgsIDB4MzE5NTk1YTQsIDB4ZDNlNGU0MzcsIDB4ZjI3OTc5OGIsIDB4ZDVlN2U3MzIsIDB4OGJjOGM4NDMsIDB4NmUzNzM3NTksIDB4ZGE2ZDZkYjcsIDB4MDE4ZDhkOGMsIDB4YjFkNWQ1NjQsIDB4OWM0ZTRlZDIsIDB4NDlhOWE5ZTAsIDB4ZDg2YzZjYjQsIDB4YWM1NjU2ZmEsIDB4ZjNmNGY0MDcsIDB4Y2ZlYWVhMjUsIDB4Y2E2NTY1YWYsIDB4ZjQ3YTdhOGUsIDB4NDdhZWFlZTksIDB4MTAwODA4MTgsIDB4NmZiYWJhZDUsIDB4ZjA3ODc4ODgsIDB4NGEyNTI1NmYsIDB4NWMyZTJlNzIsIDB4MzgxYzFjMjQsIDB4NTdhNmE2ZjEsIDB4NzNiNGI0YzcsIDB4OTdjNmM2NTEsIDB4Y2JlOGU4MjMsIDB4YTFkZGRkN2MsIDB4ZTg3NDc0OWMsIDB4M2UxZjFmMjEsIDB4OTY0YjRiZGQsIDB4NjFiZGJkZGMsIDB4MGQ4YjhiODYsIDB4MGY4YThhODUsIDB4ZTA3MDcwOTAsIDB4N2MzZTNlNDIsIDB4NzFiNWI1YzQsIDB4Y2M2NjY2YWEsIDB4OTA0ODQ4ZDgsIDB4MDYwMzAzMDUsIDB4ZjdmNmY2MDEsIDB4MWMwZTBlMTIsIDB4YzI2MTYxYTMsIDB4NmEzNTM1NWYsIDB4YWU1NzU3ZjksIDB4NjliOWI5ZDAsIDB4MTc4Njg2OTEsIDB4OTljMWMxNTgsIDB4M2ExZDFkMjcsIDB4Mjc5ZTllYjksIDB4ZDllMWUxMzgsIDB4ZWJmOGY4MTMsIDB4MmI5ODk4YjMsIDB4MjIxMTExMzMsIDB4ZDI2OTY5YmIsIDB4YTlkOWQ5NzAsIDB4MDc4ZThlODksIDB4MzM5NDk0YTcsIDB4MmQ5YjliYjYsIDB4M2MxZTFlMjIsIDB4MTU4Nzg3OTIsIDB4YzllOWU5MjAsIDB4ODdjZWNlNDksIDB4YWE1NTU1ZmYsIDB4NTAyODI4NzgsIDB4YTVkZmRmN2EsIDB4MDM4YzhjOGYsIDB4NTlhMWExZjgsIDB4MDk4OTg5ODAsIDB4MWEwZDBkMTcsIDB4NjViZmJmZGEsIDB4ZDdlNmU2MzEsIDB4ODQ0MjQyYzYsIDB4ZDA2ODY4YjgsIDB4ODI0MTQxYzMsIDB4Mjk5OTk5YjAsIDB4NWEyZDJkNzcsIDB4MWUwZjBmMTEsIDB4N2JiMGIwY2IsIDB4YTg1NDU0ZmMsIDB4NmRiYmJiZDYsIDB4MmMxNjE2M2FdO1xuICAgIHZhciBUMiA9IFsweGE1YzY2MzYzLCAweDg0Zjg3YzdjLCAweDk5ZWU3Nzc3LCAweDhkZjY3YjdiLCAweDBkZmZmMmYyLCAweGJkZDY2YjZiLCAweGIxZGU2ZjZmLCAweDU0OTFjNWM1LCAweDUwNjAzMDMwLCAweDAzMDIwMTAxLCAweGE5Y2U2NzY3LCAweDdkNTYyYjJiLCAweDE5ZTdmZWZlLCAweDYyYjVkN2Q3LCAweGU2NGRhYmFiLCAweDlhZWM3Njc2LCAweDQ1OGZjYWNhLCAweDlkMWY4MjgyLCAweDQwODljOWM5LCAweDg3ZmE3ZDdkLCAweDE1ZWZmYWZhLCAweGViYjI1OTU5LCAweGM5OGU0NzQ3LCAweDBiZmJmMGYwLCAweGVjNDFhZGFkLCAweDY3YjNkNGQ0LCAweGZkNWZhMmEyLCAweGVhNDVhZmFmLCAweGJmMjM5YzljLCAweGY3NTNhNGE0LCAweDk2ZTQ3MjcyLCAweDViOWJjMGMwLCAweGMyNzViN2I3LCAweDFjZTFmZGZkLCAweGFlM2Q5MzkzLCAweDZhNGMyNjI2LCAweDVhNmMzNjM2LCAweDQxN2UzZjNmLCAweDAyZjVmN2Y3LCAweDRmODNjY2NjLCAweDVjNjgzNDM0LCAweGY0NTFhNWE1LCAweDM0ZDFlNWU1LCAweDA4ZjlmMWYxLCAweDkzZTI3MTcxLCAweDczYWJkOGQ4LCAweDUzNjIzMTMxLCAweDNmMmExNTE1LCAweDBjMDgwNDA0LCAweDUyOTVjN2M3LCAweDY1NDYyMzIzLCAweDVlOWRjM2MzLCAweDI4MzAxODE4LCAweGExMzc5Njk2LCAweDBmMGEwNTA1LCAweGI1MmY5YTlhLCAweDA5MGUwNzA3LCAweDM2MjQxMjEyLCAweDliMWI4MDgwLCAweDNkZGZlMmUyLCAweDI2Y2RlYmViLCAweDY5NGUyNzI3LCAweGNkN2ZiMmIyLCAweDlmZWE3NTc1LCAweDFiMTIwOTA5LCAweDllMWQ4MzgzLCAweDc0NTgyYzJjLCAweDJlMzQxYTFhLCAweDJkMzYxYjFiLCAweGIyZGM2ZTZlLCAweGVlYjQ1YTVhLCAweGZiNWJhMGEwLCAweGY2YTQ1MjUyLCAweDRkNzYzYjNiLCAweDYxYjdkNmQ2LCAweGNlN2RiM2IzLCAweDdiNTIyOTI5LCAweDNlZGRlM2UzLCAweDcxNWUyZjJmLCAweDk3MTM4NDg0LCAweGY1YTY1MzUzLCAweDY4YjlkMWQxLCAweDAwMDAwMDAwLCAweDJjYzFlZGVkLCAweDYwNDAyMDIwLCAweDFmZTNmY2ZjLCAweGM4NzliMWIxLCAweGVkYjY1YjViLCAweGJlZDQ2YTZhLCAweDQ2OGRjYmNiLCAweGQ5NjdiZWJlLCAweDRiNzIzOTM5LCAweGRlOTQ0YTRhLCAweGQ0OTg0YzRjLCAweGU4YjA1ODU4LCAweDRhODVjZmNmLCAweDZiYmJkMGQwLCAweDJhYzVlZmVmLCAweGU1NGZhYWFhLCAweDE2ZWRmYmZiLCAweGM1ODY0MzQzLCAweGQ3OWE0ZDRkLCAweDU1NjYzMzMzLCAweDk0MTE4NTg1LCAweGNmOGE0NTQ1LCAweDEwZTlmOWY5LCAweDA2MDQwMjAyLCAweDgxZmU3ZjdmLCAweGYwYTA1MDUwLCAweDQ0NzgzYzNjLCAweGJhMjU5ZjlmLCAweGUzNGJhOGE4LCAweGYzYTI1MTUxLCAweGZlNWRhM2EzLCAweGMwODA0MDQwLCAweDhhMDU4ZjhmLCAweGFkM2Y5MjkyLCAweGJjMjE5ZDlkLCAweDQ4NzAzODM4LCAweDA0ZjFmNWY1LCAweGRmNjNiY2JjLCAweGMxNzdiNmI2LCAweDc1YWZkYWRhLCAweDYzNDIyMTIxLCAweDMwMjAxMDEwLCAweDFhZTVmZmZmLCAweDBlZmRmM2YzLCAweDZkYmZkMmQyLCAweDRjODFjZGNkLCAweDE0MTgwYzBjLCAweDM1MjYxMzEzLCAweDJmYzNlY2VjLCAweGUxYmU1ZjVmLCAweGEyMzU5Nzk3LCAweGNjODg0NDQ0LCAweDM5MmUxNzE3LCAweDU3OTNjNGM0LCAweGYyNTVhN2E3LCAweDgyZmM3ZTdlLCAweDQ3N2EzZDNkLCAweGFjYzg2NDY0LCAweGU3YmE1ZDVkLCAweDJiMzIxOTE5LCAweDk1ZTY3MzczLCAweGEwYzA2MDYwLCAweDk4MTk4MTgxLCAweGQxOWU0ZjRmLCAweDdmYTNkY2RjLCAweDY2NDQyMjIyLCAweDdlNTQyYTJhLCAweGFiM2I5MDkwLCAweDgzMGI4ODg4LCAweGNhOGM0NjQ2LCAweDI5YzdlZWVlLCAweGQzNmJiOGI4LCAweDNjMjgxNDE0LCAweDc5YTdkZWRlLCAweGUyYmM1ZTVlLCAweDFkMTYwYjBiLCAweDc2YWRkYmRiLCAweDNiZGJlMGUwLCAweDU2NjQzMjMyLCAweDRlNzQzYTNhLCAweDFlMTQwYTBhLCAweGRiOTI0OTQ5LCAweDBhMGMwNjA2LCAweDZjNDgyNDI0LCAweGU0Yjg1YzVjLCAweDVkOWZjMmMyLCAweDZlYmRkM2QzLCAweGVmNDNhY2FjLCAweGE2YzQ2MjYyLCAweGE4Mzk5MTkxLCAweGE0MzE5NTk1LCAweDM3ZDNlNGU0LCAweDhiZjI3OTc5LCAweDMyZDVlN2U3LCAweDQzOGJjOGM4LCAweDU5NmUzNzM3LCAweGI3ZGE2ZDZkLCAweDhjMDE4ZDhkLCAweDY0YjFkNWQ1LCAweGQyOWM0ZTRlLCAweGUwNDlhOWE5LCAweGI0ZDg2YzZjLCAweGZhYWM1NjU2LCAweDA3ZjNmNGY0LCAweDI1Y2ZlYWVhLCAweGFmY2E2NTY1LCAweDhlZjQ3YTdhLCAweGU5NDdhZWFlLCAweDE4MTAwODA4LCAweGQ1NmZiYWJhLCAweDg4ZjA3ODc4LCAweDZmNGEyNTI1LCAweDcyNWMyZTJlLCAweDI0MzgxYzFjLCAweGYxNTdhNmE2LCAweGM3NzNiNGI0LCAweDUxOTdjNmM2LCAweDIzY2JlOGU4LCAweDdjYTFkZGRkLCAweDljZTg3NDc0LCAweDIxM2UxZjFmLCAweGRkOTY0YjRiLCAweGRjNjFiZGJkLCAweDg2MGQ4YjhiLCAweDg1MGY4YThhLCAweDkwZTA3MDcwLCAweDQyN2MzZTNlLCAweGM0NzFiNWI1LCAweGFhY2M2NjY2LCAweGQ4OTA0ODQ4LCAweDA1MDYwMzAzLCAweDAxZjdmNmY2LCAweDEyMWMwZTBlLCAweGEzYzI2MTYxLCAweDVmNmEzNTM1LCAweGY5YWU1NzU3LCAweGQwNjliOWI5LCAweDkxMTc4Njg2LCAweDU4OTljMWMxLCAweDI3M2ExZDFkLCAweGI5Mjc5ZTllLCAweDM4ZDllMWUxLCAweDEzZWJmOGY4LCAweGIzMmI5ODk4LCAweDMzMjIxMTExLCAweGJiZDI2OTY5LCAweDcwYTlkOWQ5LCAweDg5MDc4ZThlLCAweGE3MzM5NDk0LCAweGI2MmQ5YjliLCAweDIyM2MxZTFlLCAweDkyMTU4Nzg3LCAweDIwYzllOWU5LCAweDQ5ODdjZWNlLCAweGZmYWE1NTU1LCAweDc4NTAyODI4LCAweDdhYTVkZmRmLCAweDhmMDM4YzhjLCAweGY4NTlhMWExLCAweDgwMDk4OTg5LCAweDE3MWEwZDBkLCAweGRhNjViZmJmLCAweDMxZDdlNmU2LCAweGM2ODQ0MjQyLCAweGI4ZDA2ODY4LCAweGMzODI0MTQxLCAweGIwMjk5OTk5LCAweDc3NWEyZDJkLCAweDExMWUwZjBmLCAweGNiN2JiMGIwLCAweGZjYTg1NDU0LCAweGQ2NmRiYmJiLCAweDNhMmMxNjE2XTtcbiAgICB2YXIgVDMgPSBbMHg2M2E1YzY2MywgMHg3Yzg0Zjg3YywgMHg3Nzk5ZWU3NywgMHg3YjhkZjY3YiwgMHhmMjBkZmZmMiwgMHg2YmJkZDY2YiwgMHg2ZmIxZGU2ZiwgMHhjNTU0OTFjNSwgMHgzMDUwNjAzMCwgMHgwMTAzMDIwMSwgMHg2N2E5Y2U2NywgMHgyYjdkNTYyYiwgMHhmZTE5ZTdmZSwgMHhkNzYyYjVkNywgMHhhYmU2NGRhYiwgMHg3NjlhZWM3NiwgMHhjYTQ1OGZjYSwgMHg4MjlkMWY4MiwgMHhjOTQwODljOSwgMHg3ZDg3ZmE3ZCwgMHhmYTE1ZWZmYSwgMHg1OWViYjI1OSwgMHg0N2M5OGU0NywgMHhmMDBiZmJmMCwgMHhhZGVjNDFhZCwgMHhkNDY3YjNkNCwgMHhhMmZkNWZhMiwgMHhhZmVhNDVhZiwgMHg5Y2JmMjM5YywgMHhhNGY3NTNhNCwgMHg3Mjk2ZTQ3MiwgMHhjMDViOWJjMCwgMHhiN2MyNzViNywgMHhmZDFjZTFmZCwgMHg5M2FlM2Q5MywgMHgyNjZhNGMyNiwgMHgzNjVhNmMzNiwgMHgzZjQxN2UzZiwgMHhmNzAyZjVmNywgMHhjYzRmODNjYywgMHgzNDVjNjgzNCwgMHhhNWY0NTFhNSwgMHhlNTM0ZDFlNSwgMHhmMTA4ZjlmMSwgMHg3MTkzZTI3MSwgMHhkODczYWJkOCwgMHgzMTUzNjIzMSwgMHgxNTNmMmExNSwgMHgwNDBjMDgwNCwgMHhjNzUyOTVjNywgMHgyMzY1NDYyMywgMHhjMzVlOWRjMywgMHgxODI4MzAxOCwgMHg5NmExMzc5NiwgMHgwNTBmMGEwNSwgMHg5YWI1MmY5YSwgMHgwNzA5MGUwNywgMHgxMjM2MjQxMiwgMHg4MDliMWI4MCwgMHhlMjNkZGZlMiwgMHhlYjI2Y2RlYiwgMHgyNzY5NGUyNywgMHhiMmNkN2ZiMiwgMHg3NTlmZWE3NSwgMHgwOTFiMTIwOSwgMHg4MzllMWQ4MywgMHgyYzc0NTgyYywgMHgxYTJlMzQxYSwgMHgxYjJkMzYxYiwgMHg2ZWIyZGM2ZSwgMHg1YWVlYjQ1YSwgMHhhMGZiNWJhMCwgMHg1MmY2YTQ1MiwgMHgzYjRkNzYzYiwgMHhkNjYxYjdkNiwgMHhiM2NlN2RiMywgMHgyOTdiNTIyOSwgMHhlMzNlZGRlMywgMHgyZjcxNWUyZiwgMHg4NDk3MTM4NCwgMHg1M2Y1YTY1MywgMHhkMTY4YjlkMSwgMHgwMDAwMDAwMCwgMHhlZDJjYzFlZCwgMHgyMDYwNDAyMCwgMHhmYzFmZTNmYywgMHhiMWM4NzliMSwgMHg1YmVkYjY1YiwgMHg2YWJlZDQ2YSwgMHhjYjQ2OGRjYiwgMHhiZWQ5NjdiZSwgMHgzOTRiNzIzOSwgMHg0YWRlOTQ0YSwgMHg0Y2Q0OTg0YywgMHg1OGU4YjA1OCwgMHhjZjRhODVjZiwgMHhkMDZiYmJkMCwgMHhlZjJhYzVlZiwgMHhhYWU1NGZhYSwgMHhmYjE2ZWRmYiwgMHg0M2M1ODY0MywgMHg0ZGQ3OWE0ZCwgMHgzMzU1NjYzMywgMHg4NTk0MTE4NSwgMHg0NWNmOGE0NSwgMHhmOTEwZTlmOSwgMHgwMjA2MDQwMiwgMHg3ZjgxZmU3ZiwgMHg1MGYwYTA1MCwgMHgzYzQ0NzgzYywgMHg5ZmJhMjU5ZiwgMHhhOGUzNGJhOCwgMHg1MWYzYTI1MSwgMHhhM2ZlNWRhMywgMHg0MGMwODA0MCwgMHg4ZjhhMDU4ZiwgMHg5MmFkM2Y5MiwgMHg5ZGJjMjE5ZCwgMHgzODQ4NzAzOCwgMHhmNTA0ZjFmNSwgMHhiY2RmNjNiYywgMHhiNmMxNzdiNiwgMHhkYTc1YWZkYSwgMHgyMTYzNDIyMSwgMHgxMDMwMjAxMCwgMHhmZjFhZTVmZiwgMHhmMzBlZmRmMywgMHhkMjZkYmZkMiwgMHhjZDRjODFjZCwgMHgwYzE0MTgwYywgMHgxMzM1MjYxMywgMHhlYzJmYzNlYywgMHg1ZmUxYmU1ZiwgMHg5N2EyMzU5NywgMHg0NGNjODg0NCwgMHgxNzM5MmUxNywgMHhjNDU3OTNjNCwgMHhhN2YyNTVhNywgMHg3ZTgyZmM3ZSwgMHgzZDQ3N2EzZCwgMHg2NGFjYzg2NCwgMHg1ZGU3YmE1ZCwgMHgxOTJiMzIxOSwgMHg3Mzk1ZTY3MywgMHg2MGEwYzA2MCwgMHg4MTk4MTk4MSwgMHg0ZmQxOWU0ZiwgMHhkYzdmYTNkYywgMHgyMjY2NDQyMiwgMHgyYTdlNTQyYSwgMHg5MGFiM2I5MCwgMHg4ODgzMGI4OCwgMHg0NmNhOGM0NiwgMHhlZTI5YzdlZSwgMHhiOGQzNmJiOCwgMHgxNDNjMjgxNCwgMHhkZTc5YTdkZSwgMHg1ZWUyYmM1ZSwgMHgwYjFkMTYwYiwgMHhkYjc2YWRkYiwgMHhlMDNiZGJlMCwgMHgzMjU2NjQzMiwgMHgzYTRlNzQzYSwgMHgwYTFlMTQwYSwgMHg0OWRiOTI0OSwgMHgwNjBhMGMwNiwgMHgyNDZjNDgyNCwgMHg1Y2U0Yjg1YywgMHhjMjVkOWZjMiwgMHhkMzZlYmRkMywgMHhhY2VmNDNhYywgMHg2MmE2YzQ2MiwgMHg5MWE4Mzk5MSwgMHg5NWE0MzE5NSwgMHhlNDM3ZDNlNCwgMHg3OThiZjI3OSwgMHhlNzMyZDVlNywgMHhjODQzOGJjOCwgMHgzNzU5NmUzNywgMHg2ZGI3ZGE2ZCwgMHg4ZDhjMDE4ZCwgMHhkNTY0YjFkNSwgMHg0ZWQyOWM0ZSwgMHhhOWUwNDlhOSwgMHg2Y2I0ZDg2YywgMHg1NmZhYWM1NiwgMHhmNDA3ZjNmNCwgMHhlYTI1Y2ZlYSwgMHg2NWFmY2E2NSwgMHg3YThlZjQ3YSwgMHhhZWU5NDdhZSwgMHgwODE4MTAwOCwgMHhiYWQ1NmZiYSwgMHg3ODg4ZjA3OCwgMHgyNTZmNGEyNSwgMHgyZTcyNWMyZSwgMHgxYzI0MzgxYywgMHhhNmYxNTdhNiwgMHhiNGM3NzNiNCwgMHhjNjUxOTdjNiwgMHhlODIzY2JlOCwgMHhkZDdjYTFkZCwgMHg3NDljZTg3NCwgMHgxZjIxM2UxZiwgMHg0YmRkOTY0YiwgMHhiZGRjNjFiZCwgMHg4Yjg2MGQ4YiwgMHg4YTg1MGY4YSwgMHg3MDkwZTA3MCwgMHgzZTQyN2MzZSwgMHhiNWM0NzFiNSwgMHg2NmFhY2M2NiwgMHg0OGQ4OTA0OCwgMHgwMzA1MDYwMywgMHhmNjAxZjdmNiwgMHgwZTEyMWMwZSwgMHg2MWEzYzI2MSwgMHgzNTVmNmEzNSwgMHg1N2Y5YWU1NywgMHhiOWQwNjliOSwgMHg4NjkxMTc4NiwgMHhjMTU4OTljMSwgMHgxZDI3M2ExZCwgMHg5ZWI5Mjc5ZSwgMHhlMTM4ZDllMSwgMHhmODEzZWJmOCwgMHg5OGIzMmI5OCwgMHgxMTMzMjIxMSwgMHg2OWJiZDI2OSwgMHhkOTcwYTlkOSwgMHg4ZTg5MDc4ZSwgMHg5NGE3MzM5NCwgMHg5YmI2MmQ5YiwgMHgxZTIyM2MxZSwgMHg4NzkyMTU4NywgMHhlOTIwYzllOSwgMHhjZTQ5ODdjZSwgMHg1NWZmYWE1NSwgMHgyODc4NTAyOCwgMHhkZjdhYTVkZiwgMHg4YzhmMDM4YywgMHhhMWY4NTlhMSwgMHg4OTgwMDk4OSwgMHgwZDE3MWEwZCwgMHhiZmRhNjViZiwgMHhlNjMxZDdlNiwgMHg0MmM2ODQ0MiwgMHg2OGI4ZDA2OCwgMHg0MWMzODI0MSwgMHg5OWIwMjk5OSwgMHgyZDc3NWEyZCwgMHgwZjExMWUwZiwgMHhiMGNiN2JiMCwgMHg1NGZjYTg1NCwgMHhiYmQ2NmRiYiwgMHgxNjNhMmMxNl07XG4gICAgdmFyIFQ0ID0gWzB4NjM2M2E1YzYsIDB4N2M3Yzg0ZjgsIDB4Nzc3Nzk5ZWUsIDB4N2I3YjhkZjYsIDB4ZjJmMjBkZmYsIDB4NmI2YmJkZDYsIDB4NmY2ZmIxZGUsIDB4YzVjNTU0OTEsIDB4MzAzMDUwNjAsIDB4MDEwMTAzMDIsIDB4Njc2N2E5Y2UsIDB4MmIyYjdkNTYsIDB4ZmVmZTE5ZTcsIDB4ZDdkNzYyYjUsIDB4YWJhYmU2NGQsIDB4NzY3NjlhZWMsIDB4Y2FjYTQ1OGYsIDB4ODI4MjlkMWYsIDB4YzljOTQwODksIDB4N2Q3ZDg3ZmEsIDB4ZmFmYTE1ZWYsIDB4NTk1OWViYjIsIDB4NDc0N2M5OGUsIDB4ZjBmMDBiZmIsIDB4YWRhZGVjNDEsIDB4ZDRkNDY3YjMsIDB4YTJhMmZkNWYsIDB4YWZhZmVhNDUsIDB4OWM5Y2JmMjMsIDB4YTRhNGY3NTMsIDB4NzI3Mjk2ZTQsIDB4YzBjMDViOWIsIDB4YjdiN2MyNzUsIDB4ZmRmZDFjZTEsIDB4OTM5M2FlM2QsIDB4MjYyNjZhNGMsIDB4MzYzNjVhNmMsIDB4M2YzZjQxN2UsIDB4ZjdmNzAyZjUsIDB4Y2NjYzRmODMsIDB4MzQzNDVjNjgsIDB4YTVhNWY0NTEsIDB4ZTVlNTM0ZDEsIDB4ZjFmMTA4ZjksIDB4NzE3MTkzZTIsIDB4ZDhkODczYWIsIDB4MzEzMTUzNjIsIDB4MTUxNTNmMmEsIDB4MDQwNDBjMDgsIDB4YzdjNzUyOTUsIDB4MjMyMzY1NDYsIDB4YzNjMzVlOWQsIDB4MTgxODI4MzAsIDB4OTY5NmExMzcsIDB4MDUwNTBmMGEsIDB4OWE5YWI1MmYsIDB4MDcwNzA5MGUsIDB4MTIxMjM2MjQsIDB4ODA4MDliMWIsIDB4ZTJlMjNkZGYsIDB4ZWJlYjI2Y2QsIDB4MjcyNzY5NGUsIDB4YjJiMmNkN2YsIDB4NzU3NTlmZWEsIDB4MDkwOTFiMTIsIDB4ODM4MzllMWQsIDB4MmMyYzc0NTgsIDB4MWExYTJlMzQsIDB4MWIxYjJkMzYsIDB4NmU2ZWIyZGMsIDB4NWE1YWVlYjQsIDB4YTBhMGZiNWIsIDB4NTI1MmY2YTQsIDB4M2IzYjRkNzYsIDB4ZDZkNjYxYjcsIDB4YjNiM2NlN2QsIDB4MjkyOTdiNTIsIDB4ZTNlMzNlZGQsIDB4MmYyZjcxNWUsIDB4ODQ4NDk3MTMsIDB4NTM1M2Y1YTYsIDB4ZDFkMTY4YjksIDB4MDAwMDAwMDAsIDB4ZWRlZDJjYzEsIDB4MjAyMDYwNDAsIDB4ZmNmYzFmZTMsIDB4YjFiMWM4NzksIDB4NWI1YmVkYjYsIDB4NmE2YWJlZDQsIDB4Y2JjYjQ2OGQsIDB4YmViZWQ5NjcsIDB4MzkzOTRiNzIsIDB4NGE0YWRlOTQsIDB4NGM0Y2Q0OTgsIDB4NTg1OGU4YjAsIDB4Y2ZjZjRhODUsIDB4ZDBkMDZiYmIsIDB4ZWZlZjJhYzUsIDB4YWFhYWU1NGYsIDB4ZmJmYjE2ZWQsIDB4NDM0M2M1ODYsIDB4NGQ0ZGQ3OWEsIDB4MzMzMzU1NjYsIDB4ODU4NTk0MTEsIDB4NDU0NWNmOGEsIDB4ZjlmOTEwZTksIDB4MDIwMjA2MDQsIDB4N2Y3ZjgxZmUsIDB4NTA1MGYwYTAsIDB4M2MzYzQ0NzgsIDB4OWY5ZmJhMjUsIDB4YThhOGUzNGIsIDB4NTE1MWYzYTIsIDB4YTNhM2ZlNWQsIDB4NDA0MGMwODAsIDB4OGY4ZjhhMDUsIDB4OTI5MmFkM2YsIDB4OWQ5ZGJjMjEsIDB4MzgzODQ4NzAsIDB4ZjVmNTA0ZjEsIDB4YmNiY2RmNjMsIDB4YjZiNmMxNzcsIDB4ZGFkYTc1YWYsIDB4MjEyMTYzNDIsIDB4MTAxMDMwMjAsIDB4ZmZmZjFhZTUsIDB4ZjNmMzBlZmQsIDB4ZDJkMjZkYmYsIDB4Y2RjZDRjODEsIDB4MGMwYzE0MTgsIDB4MTMxMzM1MjYsIDB4ZWNlYzJmYzMsIDB4NWY1ZmUxYmUsIDB4OTc5N2EyMzUsIDB4NDQ0NGNjODgsIDB4MTcxNzM5MmUsIDB4YzRjNDU3OTMsIDB4YTdhN2YyNTUsIDB4N2U3ZTgyZmMsIDB4M2QzZDQ3N2EsIDB4NjQ2NGFjYzgsIDB4NWQ1ZGU3YmEsIDB4MTkxOTJiMzIsIDB4NzM3Mzk1ZTYsIDB4NjA2MGEwYzAsIDB4ODE4MTk4MTksIDB4NGY0ZmQxOWUsIDB4ZGNkYzdmYTMsIDB4MjIyMjY2NDQsIDB4MmEyYTdlNTQsIDB4OTA5MGFiM2IsIDB4ODg4ODgzMGIsIDB4NDY0NmNhOGMsIDB4ZWVlZTI5YzcsIDB4YjhiOGQzNmIsIDB4MTQxNDNjMjgsIDB4ZGVkZTc5YTcsIDB4NWU1ZWUyYmMsIDB4MGIwYjFkMTYsIDB4ZGJkYjc2YWQsIDB4ZTBlMDNiZGIsIDB4MzIzMjU2NjQsIDB4M2EzYTRlNzQsIDB4MGEwYTFlMTQsIDB4NDk0OWRiOTIsIDB4MDYwNjBhMGMsIDB4MjQyNDZjNDgsIDB4NWM1Y2U0YjgsIDB4YzJjMjVkOWYsIDB4ZDNkMzZlYmQsIDB4YWNhY2VmNDMsIDB4NjI2MmE2YzQsIDB4OTE5MWE4MzksIDB4OTU5NWE0MzEsIDB4ZTRlNDM3ZDMsIDB4Nzk3OThiZjIsIDB4ZTdlNzMyZDUsIDB4YzhjODQzOGIsIDB4MzczNzU5NmUsIDB4NmQ2ZGI3ZGEsIDB4OGQ4ZDhjMDEsIDB4ZDVkNTY0YjEsIDB4NGU0ZWQyOWMsIDB4YTlhOWUwNDksIDB4NmM2Y2I0ZDgsIDB4NTY1NmZhYWMsIDB4ZjRmNDA3ZjMsIDB4ZWFlYTI1Y2YsIDB4NjU2NWFmY2EsIDB4N2E3YThlZjQsIDB4YWVhZWU5NDcsIDB4MDgwODE4MTAsIDB4YmFiYWQ1NmYsIDB4Nzg3ODg4ZjAsIDB4MjUyNTZmNGEsIDB4MmUyZTcyNWMsIDB4MWMxYzI0MzgsIDB4YTZhNmYxNTcsIDB4YjRiNGM3NzMsIDB4YzZjNjUxOTcsIDB4ZThlODIzY2IsIDB4ZGRkZDdjYTEsIDB4NzQ3NDljZTgsIDB4MWYxZjIxM2UsIDB4NGI0YmRkOTYsIDB4YmRiZGRjNjEsIDB4OGI4Yjg2MGQsIDB4OGE4YTg1MGYsIDB4NzA3MDkwZTAsIDB4M2UzZTQyN2MsIDB4YjViNWM0NzEsIDB4NjY2NmFhY2MsIDB4NDg0OGQ4OTAsIDB4MDMwMzA1MDYsIDB4ZjZmNjAxZjcsIDB4MGUwZTEyMWMsIDB4NjE2MWEzYzIsIDB4MzUzNTVmNmEsIDB4NTc1N2Y5YWUsIDB4YjliOWQwNjksIDB4ODY4NjkxMTcsIDB4YzFjMTU4OTksIDB4MWQxZDI3M2EsIDB4OWU5ZWI5MjcsIDB4ZTFlMTM4ZDksIDB4ZjhmODEzZWIsIDB4OTg5OGIzMmIsIDB4MTExMTMzMjIsIDB4Njk2OWJiZDIsIDB4ZDlkOTcwYTksIDB4OGU4ZTg5MDcsIDB4OTQ5NGE3MzMsIDB4OWI5YmI2MmQsIDB4MWUxZTIyM2MsIDB4ODc4NzkyMTUsIDB4ZTllOTIwYzksIDB4Y2VjZTQ5ODcsIDB4NTU1NWZmYWEsIDB4MjgyODc4NTAsIDB4ZGZkZjdhYTUsIDB4OGM4YzhmMDMsIDB4YTFhMWY4NTksIDB4ODk4OTgwMDksIDB4MGQwZDE3MWEsIDB4YmZiZmRhNjUsIDB4ZTZlNjMxZDcsIDB4NDI0MmM2ODQsIDB4Njg2OGI4ZDAsIDB4NDE0MWMzODIsIDB4OTk5OWIwMjksIDB4MmQyZDc3NWEsIDB4MGYwZjExMWUsIDB4YjBiMGNiN2IsIDB4NTQ1NGZjYTgsIDB4YmJiYmQ2NmQsIDB4MTYxNjNhMmNdO1xuXG4gICAgLy8gVHJhbnNmb3JtYXRpb25zIGZvciBkZWNyeXB0aW9uXG4gICAgdmFyIFQ1ID0gWzB4NTFmNGE3NTAsIDB4N2U0MTY1NTMsIDB4MWExN2E0YzMsIDB4M2EyNzVlOTYsIDB4M2JhYjZiY2IsIDB4MWY5ZDQ1ZjEsIDB4YWNmYTU4YWIsIDB4NGJlMzAzOTMsIDB4MjAzMGZhNTUsIDB4YWQ3NjZkZjYsIDB4ODhjYzc2OTEsIDB4ZjUwMjRjMjUsIDB4NGZlNWQ3ZmMsIDB4YzUyYWNiZDcsIDB4MjYzNTQ0ODAsIDB4YjU2MmEzOGYsIDB4ZGViMTVhNDksIDB4MjViYTFiNjcsIDB4NDVlYTBlOTgsIDB4NWRmZWMwZTEsIDB4YzMyZjc1MDIsIDB4ODE0Y2YwMTIsIDB4OGQ0Njk3YTMsIDB4NmJkM2Y5YzYsIDB4MDM4ZjVmZTcsIDB4MTU5MjljOTUsIDB4YmY2ZDdhZWIsIDB4OTU1MjU5ZGEsIDB4ZDRiZTgzMmQsIDB4NTg3NDIxZDMsIDB4NDllMDY5MjksIDB4OGVjOWM4NDQsIDB4NzVjMjg5NmEsIDB4ZjQ4ZTc5NzgsIDB4OTk1ODNlNmIsIDB4MjdiOTcxZGQsIDB4YmVlMTRmYjYsIDB4ZjA4OGFkMTcsIDB4YzkyMGFjNjYsIDB4N2RjZTNhYjQsIDB4NjNkZjRhMTgsIDB4ZTUxYTMxODIsIDB4OTc1MTMzNjAsIDB4NjI1MzdmNDUsIDB4YjE2NDc3ZTAsIDB4YmI2YmFlODQsIDB4ZmU4MWEwMWMsIDB4ZjkwODJiOTQsIDB4NzA0ODY4NTgsIDB4OGY0NWZkMTksIDB4OTRkZTZjODcsIDB4NTI3YmY4YjcsIDB4YWI3M2QzMjMsIDB4NzI0YjAyZTIsIDB4ZTMxZjhmNTcsIDB4NjY1NWFiMmEsIDB4YjJlYjI4MDcsIDB4MmZiNWMyMDMsIDB4ODZjNTdiOWEsIDB4ZDMzNzA4YTUsIDB4MzAyODg3ZjIsIDB4MjNiZmE1YjIsIDB4MDIwMzZhYmEsIDB4ZWQxNjgyNWMsIDB4OGFjZjFjMmIsIDB4YTc3OWI0OTIsIDB4ZjMwN2YyZjAsIDB4NGU2OWUyYTEsIDB4NjVkYWY0Y2QsIDB4MDYwNWJlZDUsIDB4ZDEzNDYyMWYsIDB4YzRhNmZlOGEsIDB4MzQyZTUzOWQsIDB4YTJmMzU1YTAsIDB4MDU4YWUxMzIsIDB4YTRmNmViNzUsIDB4MGI4M2VjMzksIDB4NDA2MGVmYWEsIDB4NWU3MTlmMDYsIDB4YmQ2ZTEwNTEsIDB4M2UyMThhZjksIDB4OTZkZDA2M2QsIDB4ZGQzZTA1YWUsIDB4NGRlNmJkNDYsIDB4OTE1NDhkYjUsIDB4NzFjNDVkMDUsIDB4MDQwNmQ0NmYsIDB4NjA1MDE1ZmYsIDB4MTk5OGZiMjQsIDB4ZDZiZGU5OTcsIDB4ODk0MDQzY2MsIDB4NjdkOTllNzcsIDB4YjBlODQyYmQsIDB4MDc4OThiODgsIDB4ZTcxOTViMzgsIDB4NzljOGVlZGIsIDB4YTE3YzBhNDcsIDB4N2M0MjBmZTksIDB4Zjg4NDFlYzksIDB4MDAwMDAwMDAsIDB4MDk4MDg2ODMsIDB4MzIyYmVkNDgsIDB4MWUxMTcwYWMsIDB4NmM1YTcyNGUsIDB4ZmQwZWZmZmIsIDB4MGY4NTM4NTYsIDB4M2RhZWQ1MWUsIDB4MzYyZDM5MjcsIDB4MGEwZmQ5NjQsIDB4Njg1Y2E2MjEsIDB4OWI1YjU0ZDEsIDB4MjQzNjJlM2EsIDB4MGMwYTY3YjEsIDB4OTM1N2U3MGYsIDB4YjRlZTk2ZDIsIDB4MWI5YjkxOWUsIDB4ODBjMGM1NGYsIDB4NjFkYzIwYTIsIDB4NWE3NzRiNjksIDB4MWMxMjFhMTYsIDB4ZTI5M2JhMGEsIDB4YzBhMDJhZTUsIDB4M2MyMmUwNDMsIDB4MTIxYjE3MWQsIDB4MGUwOTBkMGIsIDB4ZjI4YmM3YWQsIDB4MmRiNmE4YjksIDB4MTQxZWE5YzgsIDB4NTdmMTE5ODUsIDB4YWY3NTA3NGMsIDB4ZWU5OWRkYmIsIDB4YTM3ZjYwZmQsIDB4ZjcwMTI2OWYsIDB4NWM3MmY1YmMsIDB4NDQ2NjNiYzUsIDB4NWJmYjdlMzQsIDB4OGI0MzI5NzYsIDB4Y2IyM2M2ZGMsIDB4YjZlZGZjNjgsIDB4YjhlNGYxNjMsIDB4ZDczMWRjY2EsIDB4NDI2Mzg1MTAsIDB4MTM5NzIyNDAsIDB4ODRjNjExMjAsIDB4ODU0YTI0N2QsIDB4ZDJiYjNkZjgsIDB4YWVmOTMyMTEsIDB4YzcyOWExNmQsIDB4MWQ5ZTJmNGIsIDB4ZGNiMjMwZjMsIDB4MGQ4NjUyZWMsIDB4NzdjMWUzZDAsIDB4MmJiMzE2NmMsIDB4YTk3MGI5OTksIDB4MTE5NDQ4ZmEsIDB4NDdlOTY0MjIsIDB4YThmYzhjYzQsIDB4YTBmMDNmMWEsIDB4NTY3ZDJjZDgsIDB4MjIzMzkwZWYsIDB4ODc0OTRlYzcsIDB4ZDkzOGQxYzEsIDB4OGNjYWEyZmUsIDB4OThkNDBiMzYsIDB4YTZmNTgxY2YsIDB4YTU3YWRlMjgsIDB4ZGFiNzhlMjYsIDB4M2ZhZGJmYTQsIDB4MmMzYTlkZTQsIDB4NTA3ODkyMGQsIDB4NmE1ZmNjOWIsIDB4NTQ3ZTQ2NjIsIDB4ZjY4ZDEzYzIsIDB4OTBkOGI4ZTgsIDB4MmUzOWY3NWUsIDB4ODJjM2FmZjUsIDB4OWY1ZDgwYmUsIDB4NjlkMDkzN2MsIDB4NmZkNTJkYTksIDB4Y2YyNTEyYjMsIDB4YzhhYzk5M2IsIDB4MTAxODdkYTcsIDB4ZTg5YzYzNmUsIDB4ZGIzYmJiN2IsIDB4Y2QyNjc4MDksIDB4NmU1OTE4ZjQsIDB4ZWM5YWI3MDEsIDB4ODM0ZjlhYTgsIDB4ZTY5NTZlNjUsIDB4YWFmZmU2N2UsIDB4MjFiY2NmMDgsIDB4ZWYxNWU4ZTYsIDB4YmFlNzliZDksIDB4NGE2ZjM2Y2UsIDB4ZWE5ZjA5ZDQsIDB4MjliMDdjZDYsIDB4MzFhNGIyYWYsIDB4MmEzZjIzMzEsIDB4YzZhNTk0MzAsIDB4MzVhMjY2YzAsIDB4NzQ0ZWJjMzcsIDB4ZmM4MmNhYTYsIDB4ZTA5MGQwYjAsIDB4MzNhN2Q4MTUsIDB4ZjEwNDk4NGEsIDB4NDFlY2RhZjcsIDB4N2ZjZDUwMGUsIDB4MTc5MWY2MmYsIDB4NzY0ZGQ2OGQsIDB4NDNlZmIwNGQsIDB4Y2NhYTRkNTQsIDB4ZTQ5NjA0ZGYsIDB4OWVkMWI1ZTMsIDB4NGM2YTg4MWIsIDB4YzEyYzFmYjgsIDB4NDY2NTUxN2YsIDB4OWQ1ZWVhMDQsIDB4MDE4YzM1NWQsIDB4ZmE4Nzc0NzMsIDB4ZmIwYjQxMmUsIDB4YjM2NzFkNWEsIDB4OTJkYmQyNTIsIDB4ZTkxMDU2MzMsIDB4NmRkNjQ3MTMsIDB4OWFkNzYxOGMsIDB4MzdhMTBjN2EsIDB4NTlmODE0OGUsIDB4ZWIxMzNjODksIDB4Y2VhOTI3ZWUsIDB4Yjc2MWM5MzUsIDB4ZTExY2U1ZWQsIDB4N2E0N2IxM2MsIDB4OWNkMmRmNTksIDB4NTVmMjczM2YsIDB4MTgxNGNlNzksIDB4NzNjNzM3YmYsIDB4NTNmN2NkZWEsIDB4NWZmZGFhNWIsIDB4ZGYzZDZmMTQsIDB4Nzg0NGRiODYsIDB4Y2FhZmYzODEsIDB4Yjk2OGM0M2UsIDB4MzgyNDM0MmMsIDB4YzJhMzQwNWYsIDB4MTYxZGMzNzIsIDB4YmNlMjI1MGMsIDB4MjgzYzQ5OGIsIDB4ZmYwZDk1NDEsIDB4MzlhODAxNzEsIDB4MDgwY2IzZGUsIDB4ZDhiNGU0OWMsIDB4NjQ1NmMxOTAsIDB4N2JjYjg0NjEsIDB4ZDUzMmI2NzAsIDB4NDg2YzVjNzQsIDB4ZDBiODU3NDJdO1xuICAgIHZhciBUNiA9IFsweDUwNTFmNGE3LCAweDUzN2U0MTY1LCAweGMzMWExN2E0LCAweDk2M2EyNzVlLCAweGNiM2JhYjZiLCAweGYxMWY5ZDQ1LCAweGFiYWNmYTU4LCAweDkzNGJlMzAzLCAweDU1MjAzMGZhLCAweGY2YWQ3NjZkLCAweDkxODhjYzc2LCAweDI1ZjUwMjRjLCAweGZjNGZlNWQ3LCAweGQ3YzUyYWNiLCAweDgwMjYzNTQ0LCAweDhmYjU2MmEzLCAweDQ5ZGViMTVhLCAweDY3MjViYTFiLCAweDk4NDVlYTBlLCAweGUxNWRmZWMwLCAweDAyYzMyZjc1LCAweDEyODE0Y2YwLCAweGEzOGQ0Njk3LCAweGM2NmJkM2Y5LCAweGU3MDM4ZjVmLCAweDk1MTU5MjljLCAweGViYmY2ZDdhLCAweGRhOTU1MjU5LCAweDJkZDRiZTgzLCAweGQzNTg3NDIxLCAweDI5NDllMDY5LCAweDQ0OGVjOWM4LCAweDZhNzVjMjg5LCAweDc4ZjQ4ZTc5LCAweDZiOTk1ODNlLCAweGRkMjdiOTcxLCAweGI2YmVlMTRmLCAweDE3ZjA4OGFkLCAweDY2YzkyMGFjLCAweGI0N2RjZTNhLCAweDE4NjNkZjRhLCAweDgyZTUxYTMxLCAweDYwOTc1MTMzLCAweDQ1NjI1MzdmLCAweGUwYjE2NDc3LCAweDg0YmI2YmFlLCAweDFjZmU4MWEwLCAweDk0ZjkwODJiLCAweDU4NzA0ODY4LCAweDE5OGY0NWZkLCAweDg3OTRkZTZjLCAweGI3NTI3YmY4LCAweDIzYWI3M2QzLCAweGUyNzI0YjAyLCAweDU3ZTMxZjhmLCAweDJhNjY1NWFiLCAweDA3YjJlYjI4LCAweDAzMmZiNWMyLCAweDlhODZjNTdiLCAweGE1ZDMzNzA4LCAweGYyMzAyODg3LCAweGIyMjNiZmE1LCAweGJhMDIwMzZhLCAweDVjZWQxNjgyLCAweDJiOGFjZjFjLCAweDkyYTc3OWI0LCAweGYwZjMwN2YyLCAweGExNGU2OWUyLCAweGNkNjVkYWY0LCAweGQ1MDYwNWJlLCAweDFmZDEzNDYyLCAweDhhYzRhNmZlLCAweDlkMzQyZTUzLCAweGEwYTJmMzU1LCAweDMyMDU4YWUxLCAweDc1YTRmNmViLCAweDM5MGI4M2VjLCAweGFhNDA2MGVmLCAweDA2NWU3MTlmLCAweDUxYmQ2ZTEwLCAweGY5M2UyMThhLCAweDNkOTZkZDA2LCAweGFlZGQzZTA1LCAweDQ2NGRlNmJkLCAweGI1OTE1NDhkLCAweDA1NzFjNDVkLCAweDZmMDQwNmQ0LCAweGZmNjA1MDE1LCAweDI0MTk5OGZiLCAweDk3ZDZiZGU5LCAweGNjODk0MDQzLCAweDc3NjdkOTllLCAweGJkYjBlODQyLCAweDg4MDc4OThiLCAweDM4ZTcxOTViLCAweGRiNzljOGVlLCAweDQ3YTE3YzBhLCAweGU5N2M0MjBmLCAweGM5Zjg4NDFlLCAweDAwMDAwMDAwLCAweDgzMDk4MDg2LCAweDQ4MzIyYmVkLCAweGFjMWUxMTcwLCAweDRlNmM1YTcyLCAweGZiZmQwZWZmLCAweDU2MGY4NTM4LCAweDFlM2RhZWQ1LCAweDI3MzYyZDM5LCAweDY0MGEwZmQ5LCAweDIxNjg1Y2E2LCAweGQxOWI1YjU0LCAweDNhMjQzNjJlLCAweGIxMGMwYTY3LCAweDBmOTM1N2U3LCAweGQyYjRlZTk2LCAweDllMWI5YjkxLCAweDRmODBjMGM1LCAweGEyNjFkYzIwLCAweDY5NWE3NzRiLCAweDE2MWMxMjFhLCAweDBhZTI5M2JhLCAweGU1YzBhMDJhLCAweDQzM2MyMmUwLCAweDFkMTIxYjE3LCAweDBiMGUwOTBkLCAweGFkZjI4YmM3LCAweGI5MmRiNmE4LCAweGM4MTQxZWE5LCAweDg1NTdmMTE5LCAweDRjYWY3NTA3LCAweGJiZWU5OWRkLCAweGZkYTM3ZjYwLCAweDlmZjcwMTI2LCAweGJjNWM3MmY1LCAweGM1NDQ2NjNiLCAweDM0NWJmYjdlLCAweDc2OGI0MzI5LCAweGRjY2IyM2M2LCAweDY4YjZlZGZjLCAweDYzYjhlNGYxLCAweGNhZDczMWRjLCAweDEwNDI2Mzg1LCAweDQwMTM5NzIyLCAweDIwODRjNjExLCAweDdkODU0YTI0LCAweGY4ZDJiYjNkLCAweDExYWVmOTMyLCAweDZkYzcyOWExLCAweDRiMWQ5ZTJmLCAweGYzZGNiMjMwLCAweGVjMGQ4NjUyLCAweGQwNzdjMWUzLCAweDZjMmJiMzE2LCAweDk5YTk3MGI5LCAweGZhMTE5NDQ4LCAweDIyNDdlOTY0LCAweGM0YThmYzhjLCAweDFhYTBmMDNmLCAweGQ4NTY3ZDJjLCAweGVmMjIzMzkwLCAweGM3ODc0OTRlLCAweGMxZDkzOGQxLCAweGZlOGNjYWEyLCAweDM2OThkNDBiLCAweGNmYTZmNTgxLCAweDI4YTU3YWRlLCAweDI2ZGFiNzhlLCAweGE0M2ZhZGJmLCAweGU0MmMzYTlkLCAweDBkNTA3ODkyLCAweDliNmE1ZmNjLCAweDYyNTQ3ZTQ2LCAweGMyZjY4ZDEzLCAweGU4OTBkOGI4LCAweDVlMmUzOWY3LCAweGY1ODJjM2FmLCAweGJlOWY1ZDgwLCAweDdjNjlkMDkzLCAweGE5NmZkNTJkLCAweGIzY2YyNTEyLCAweDNiYzhhYzk5LCAweGE3MTAxODdkLCAweDZlZTg5YzYzLCAweDdiZGIzYmJiLCAweDA5Y2QyNjc4LCAweGY0NmU1OTE4LCAweDAxZWM5YWI3LCAweGE4ODM0ZjlhLCAweDY1ZTY5NTZlLCAweDdlYWFmZmU2LCAweDA4MjFiY2NmLCAweGU2ZWYxNWU4LCAweGQ5YmFlNzliLCAweGNlNGE2ZjM2LCAweGQ0ZWE5ZjA5LCAweGQ2MjliMDdjLCAweGFmMzFhNGIyLCAweDMxMmEzZjIzLCAweDMwYzZhNTk0LCAweGMwMzVhMjY2LCAweDM3NzQ0ZWJjLCAweGE2ZmM4MmNhLCAweGIwZTA5MGQwLCAweDE1MzNhN2Q4LCAweDRhZjEwNDk4LCAweGY3NDFlY2RhLCAweDBlN2ZjZDUwLCAweDJmMTc5MWY2LCAweDhkNzY0ZGQ2LCAweDRkNDNlZmIwLCAweDU0Y2NhYTRkLCAweGRmZTQ5NjA0LCAweGUzOWVkMWI1LCAweDFiNGM2YTg4LCAweGI4YzEyYzFmLCAweDdmNDY2NTUxLCAweDA0OWQ1ZWVhLCAweDVkMDE4YzM1LCAweDczZmE4Nzc0LCAweDJlZmIwYjQxLCAweDVhYjM2NzFkLCAweDUyOTJkYmQyLCAweDMzZTkxMDU2LCAweDEzNmRkNjQ3LCAweDhjOWFkNzYxLCAweDdhMzdhMTBjLCAweDhlNTlmODE0LCAweDg5ZWIxMzNjLCAweGVlY2VhOTI3LCAweDM1Yjc2MWM5LCAweGVkZTExY2U1LCAweDNjN2E0N2IxLCAweDU5OWNkMmRmLCAweDNmNTVmMjczLCAweDc5MTgxNGNlLCAweGJmNzNjNzM3LCAweGVhNTNmN2NkLCAweDViNWZmZGFhLCAweDE0ZGYzZDZmLCAweDg2Nzg0NGRiLCAweDgxY2FhZmYzLCAweDNlYjk2OGM0LCAweDJjMzgyNDM0LCAweDVmYzJhMzQwLCAweDcyMTYxZGMzLCAweDBjYmNlMjI1LCAweDhiMjgzYzQ5LCAweDQxZmYwZDk1LCAweDcxMzlhODAxLCAweGRlMDgwY2IzLCAweDljZDhiNGU0LCAweDkwNjQ1NmMxLCAweDYxN2JjYjg0LCAweDcwZDUzMmI2LCAweDc0NDg2YzVjLCAweDQyZDBiODU3XTtcbiAgICB2YXIgVDcgPSBbMHhhNzUwNTFmNCwgMHg2NTUzN2U0MSwgMHhhNGMzMWExNywgMHg1ZTk2M2EyNywgMHg2YmNiM2JhYiwgMHg0NWYxMWY5ZCwgMHg1OGFiYWNmYSwgMHgwMzkzNGJlMywgMHhmYTU1MjAzMCwgMHg2ZGY2YWQ3NiwgMHg3NjkxODhjYywgMHg0YzI1ZjUwMiwgMHhkN2ZjNGZlNSwgMHhjYmQ3YzUyYSwgMHg0NDgwMjYzNSwgMHhhMzhmYjU2MiwgMHg1YTQ5ZGViMSwgMHgxYjY3MjViYSwgMHgwZTk4NDVlYSwgMHhjMGUxNWRmZSwgMHg3NTAyYzMyZiwgMHhmMDEyODE0YywgMHg5N2EzOGQ0NiwgMHhmOWM2NmJkMywgMHg1ZmU3MDM4ZiwgMHg5Yzk1MTU5MiwgMHg3YWViYmY2ZCwgMHg1OWRhOTU1MiwgMHg4MzJkZDRiZSwgMHgyMWQzNTg3NCwgMHg2OTI5NDllMCwgMHhjODQ0OGVjOSwgMHg4OTZhNzVjMiwgMHg3OTc4ZjQ4ZSwgMHgzZTZiOTk1OCwgMHg3MWRkMjdiOSwgMHg0ZmI2YmVlMSwgMHhhZDE3ZjA4OCwgMHhhYzY2YzkyMCwgMHgzYWI0N2RjZSwgMHg0YTE4NjNkZiwgMHgzMTgyZTUxYSwgMHgzMzYwOTc1MSwgMHg3ZjQ1NjI1MywgMHg3N2UwYjE2NCwgMHhhZTg0YmI2YiwgMHhhMDFjZmU4MSwgMHgyYjk0ZjkwOCwgMHg2ODU4NzA0OCwgMHhmZDE5OGY0NSwgMHg2Yzg3OTRkZSwgMHhmOGI3NTI3YiwgMHhkMzIzYWI3MywgMHgwMmUyNzI0YiwgMHg4ZjU3ZTMxZiwgMHhhYjJhNjY1NSwgMHgyODA3YjJlYiwgMHhjMjAzMmZiNSwgMHg3YjlhODZjNSwgMHgwOGE1ZDMzNywgMHg4N2YyMzAyOCwgMHhhNWIyMjNiZiwgMHg2YWJhMDIwMywgMHg4MjVjZWQxNiwgMHgxYzJiOGFjZiwgMHhiNDkyYTc3OSwgMHhmMmYwZjMwNywgMHhlMmExNGU2OSwgMHhmNGNkNjVkYSwgMHhiZWQ1MDYwNSwgMHg2MjFmZDEzNCwgMHhmZThhYzRhNiwgMHg1MzlkMzQyZSwgMHg1NWEwYTJmMywgMHhlMTMyMDU4YSwgMHhlYjc1YTRmNiwgMHhlYzM5MGI4MywgMHhlZmFhNDA2MCwgMHg5ZjA2NWU3MSwgMHgxMDUxYmQ2ZSwgMHg4YWY5M2UyMSwgMHgwNjNkOTZkZCwgMHgwNWFlZGQzZSwgMHhiZDQ2NGRlNiwgMHg4ZGI1OTE1NCwgMHg1ZDA1NzFjNCwgMHhkNDZmMDQwNiwgMHgxNWZmNjA1MCwgMHhmYjI0MTk5OCwgMHhlOTk3ZDZiZCwgMHg0M2NjODk0MCwgMHg5ZTc3NjdkOSwgMHg0MmJkYjBlOCwgMHg4Yjg4MDc4OSwgMHg1YjM4ZTcxOSwgMHhlZWRiNzljOCwgMHgwYTQ3YTE3YywgMHgwZmU5N2M0MiwgMHgxZWM5Zjg4NCwgMHgwMDAwMDAwMCwgMHg4NjgzMDk4MCwgMHhlZDQ4MzIyYiwgMHg3MGFjMWUxMSwgMHg3MjRlNmM1YSwgMHhmZmZiZmQwZSwgMHgzODU2MGY4NSwgMHhkNTFlM2RhZSwgMHgzOTI3MzYyZCwgMHhkOTY0MGEwZiwgMHhhNjIxNjg1YywgMHg1NGQxOWI1YiwgMHgyZTNhMjQzNiwgMHg2N2IxMGMwYSwgMHhlNzBmOTM1NywgMHg5NmQyYjRlZSwgMHg5MTllMWI5YiwgMHhjNTRmODBjMCwgMHgyMGEyNjFkYywgMHg0YjY5NWE3NywgMHgxYTE2MWMxMiwgMHhiYTBhZTI5MywgMHgyYWU1YzBhMCwgMHhlMDQzM2MyMiwgMHgxNzFkMTIxYiwgMHgwZDBiMGUwOSwgMHhjN2FkZjI4YiwgMHhhOGI5MmRiNiwgMHhhOWM4MTQxZSwgMHgxOTg1NTdmMSwgMHgwNzRjYWY3NSwgMHhkZGJiZWU5OSwgMHg2MGZkYTM3ZiwgMHgyNjlmZjcwMSwgMHhmNWJjNWM3MiwgMHgzYmM1NDQ2NiwgMHg3ZTM0NWJmYiwgMHgyOTc2OGI0MywgMHhjNmRjY2IyMywgMHhmYzY4YjZlZCwgMHhmMTYzYjhlNCwgMHhkY2NhZDczMSwgMHg4NTEwNDI2MywgMHgyMjQwMTM5NywgMHgxMTIwODRjNiwgMHgyNDdkODU0YSwgMHgzZGY4ZDJiYiwgMHgzMjExYWVmOSwgMHhhMTZkYzcyOSwgMHgyZjRiMWQ5ZSwgMHgzMGYzZGNiMiwgMHg1MmVjMGQ4NiwgMHhlM2QwNzdjMSwgMHgxNjZjMmJiMywgMHhiOTk5YTk3MCwgMHg0OGZhMTE5NCwgMHg2NDIyNDdlOSwgMHg4Y2M0YThmYywgMHgzZjFhYTBmMCwgMHgyY2Q4NTY3ZCwgMHg5MGVmMjIzMywgMHg0ZWM3ODc0OSwgMHhkMWMxZDkzOCwgMHhhMmZlOGNjYSwgMHgwYjM2OThkNCwgMHg4MWNmYTZmNSwgMHhkZTI4YTU3YSwgMHg4ZTI2ZGFiNywgMHhiZmE0M2ZhZCwgMHg5ZGU0MmMzYSwgMHg5MjBkNTA3OCwgMHhjYzliNmE1ZiwgMHg0NjYyNTQ3ZSwgMHgxM2MyZjY4ZCwgMHhiOGU4OTBkOCwgMHhmNzVlMmUzOSwgMHhhZmY1ODJjMywgMHg4MGJlOWY1ZCwgMHg5MzdjNjlkMCwgMHgyZGE5NmZkNSwgMHgxMmIzY2YyNSwgMHg5OTNiYzhhYywgMHg3ZGE3MTAxOCwgMHg2MzZlZTg5YywgMHhiYjdiZGIzYiwgMHg3ODA5Y2QyNiwgMHgxOGY0NmU1OSwgMHhiNzAxZWM5YSwgMHg5YWE4ODM0ZiwgMHg2ZTY1ZTY5NSwgMHhlNjdlYWFmZiwgMHhjZjA4MjFiYywgMHhlOGU2ZWYxNSwgMHg5YmQ5YmFlNywgMHgzNmNlNGE2ZiwgMHgwOWQ0ZWE5ZiwgMHg3Y2Q2MjliMCwgMHhiMmFmMzFhNCwgMHgyMzMxMmEzZiwgMHg5NDMwYzZhNSwgMHg2NmMwMzVhMiwgMHhiYzM3NzQ0ZSwgMHhjYWE2ZmM4MiwgMHhkMGIwZTA5MCwgMHhkODE1MzNhNywgMHg5ODRhZjEwNCwgMHhkYWY3NDFlYywgMHg1MDBlN2ZjZCwgMHhmNjJmMTc5MSwgMHhkNjhkNzY0ZCwgMHhiMDRkNDNlZiwgMHg0ZDU0Y2NhYSwgMHgwNGRmZTQ5NiwgMHhiNWUzOWVkMSwgMHg4ODFiNGM2YSwgMHgxZmI4YzEyYywgMHg1MTdmNDY2NSwgMHhlYTA0OWQ1ZSwgMHgzNTVkMDE4YywgMHg3NDczZmE4NywgMHg0MTJlZmIwYiwgMHgxZDVhYjM2NywgMHhkMjUyOTJkYiwgMHg1NjMzZTkxMCwgMHg0NzEzNmRkNiwgMHg2MThjOWFkNywgMHgwYzdhMzdhMSwgMHgxNDhlNTlmOCwgMHgzYzg5ZWIxMywgMHgyN2VlY2VhOSwgMHhjOTM1Yjc2MSwgMHhlNWVkZTExYywgMHhiMTNjN2E0NywgMHhkZjU5OWNkMiwgMHg3MzNmNTVmMiwgMHhjZTc5MTgxNCwgMHgzN2JmNzNjNywgMHhjZGVhNTNmNywgMHhhYTViNWZmZCwgMHg2ZjE0ZGYzZCwgMHhkYjg2Nzg0NCwgMHhmMzgxY2FhZiwgMHhjNDNlYjk2OCwgMHgzNDJjMzgyNCwgMHg0MDVmYzJhMywgMHhjMzcyMTYxZCwgMHgyNTBjYmNlMiwgMHg0OThiMjgzYywgMHg5NTQxZmYwZCwgMHgwMTcxMzlhOCwgMHhiM2RlMDgwYywgMHhlNDljZDhiNCwgMHhjMTkwNjQ1NiwgMHg4NDYxN2JjYiwgMHhiNjcwZDUzMiwgMHg1Yzc0NDg2YywgMHg1NzQyZDBiOF07XG4gICAgdmFyIFQ4ID0gWzB4ZjRhNzUwNTEsIDB4NDE2NTUzN2UsIDB4MTdhNGMzMWEsIDB4Mjc1ZTk2M2EsIDB4YWI2YmNiM2IsIDB4OWQ0NWYxMWYsIDB4ZmE1OGFiYWMsIDB4ZTMwMzkzNGIsIDB4MzBmYTU1MjAsIDB4NzY2ZGY2YWQsIDB4Y2M3NjkxODgsIDB4MDI0YzI1ZjUsIDB4ZTVkN2ZjNGYsIDB4MmFjYmQ3YzUsIDB4MzU0NDgwMjYsIDB4NjJhMzhmYjUsIDB4YjE1YTQ5ZGUsIDB4YmExYjY3MjUsIDB4ZWEwZTk4NDUsIDB4ZmVjMGUxNWQsIDB4MmY3NTAyYzMsIDB4NGNmMDEyODEsIDB4NDY5N2EzOGQsIDB4ZDNmOWM2NmIsIDB4OGY1ZmU3MDMsIDB4OTI5Yzk1MTUsIDB4NmQ3YWViYmYsIDB4NTI1OWRhOTUsIDB4YmU4MzJkZDQsIDB4NzQyMWQzNTgsIDB4ZTA2OTI5NDksIDB4YzljODQ0OGUsIDB4YzI4OTZhNzUsIDB4OGU3OTc4ZjQsIDB4NTgzZTZiOTksIDB4Yjk3MWRkMjcsIDB4ZTE0ZmI2YmUsIDB4ODhhZDE3ZjAsIDB4MjBhYzY2YzksIDB4Y2UzYWI0N2QsIDB4ZGY0YTE4NjMsIDB4MWEzMTgyZTUsIDB4NTEzMzYwOTcsIDB4NTM3ZjQ1NjIsIDB4NjQ3N2UwYjEsIDB4NmJhZTg0YmIsIDB4ODFhMDFjZmUsIDB4MDgyYjk0ZjksIDB4NDg2ODU4NzAsIDB4NDVmZDE5OGYsIDB4ZGU2Yzg3OTQsIDB4N2JmOGI3NTIsIDB4NzNkMzIzYWIsIDB4NGIwMmUyNzIsIDB4MWY4ZjU3ZTMsIDB4NTVhYjJhNjYsIDB4ZWIyODA3YjIsIDB4YjVjMjAzMmYsIDB4YzU3YjlhODYsIDB4MzcwOGE1ZDMsIDB4Mjg4N2YyMzAsIDB4YmZhNWIyMjMsIDB4MDM2YWJhMDIsIDB4MTY4MjVjZWQsIDB4Y2YxYzJiOGEsIDB4NzliNDkyYTcsIDB4MDdmMmYwZjMsIDB4NjllMmExNGUsIDB4ZGFmNGNkNjUsIDB4MDViZWQ1MDYsIDB4MzQ2MjFmZDEsIDB4YTZmZThhYzQsIDB4MmU1MzlkMzQsIDB4ZjM1NWEwYTIsIDB4OGFlMTMyMDUsIDB4ZjZlYjc1YTQsIDB4ODNlYzM5MGIsIDB4NjBlZmFhNDAsIDB4NzE5ZjA2NWUsIDB4NmUxMDUxYmQsIDB4MjE4YWY5M2UsIDB4ZGQwNjNkOTYsIDB4M2UwNWFlZGQsIDB4ZTZiZDQ2NGQsIDB4NTQ4ZGI1OTEsIDB4YzQ1ZDA1NzEsIDB4MDZkNDZmMDQsIDB4NTAxNWZmNjAsIDB4OThmYjI0MTksIDB4YmRlOTk3ZDYsIDB4NDA0M2NjODksIDB4ZDk5ZTc3NjcsIDB4ZTg0MmJkYjAsIDB4ODk4Yjg4MDcsIDB4MTk1YjM4ZTcsIDB4YzhlZWRiNzksIDB4N2MwYTQ3YTEsIDB4NDIwZmU5N2MsIDB4ODQxZWM5ZjgsIDB4MDAwMDAwMDAsIDB4ODA4NjgzMDksIDB4MmJlZDQ4MzIsIDB4MTE3MGFjMWUsIDB4NWE3MjRlNmMsIDB4MGVmZmZiZmQsIDB4ODUzODU2MGYsIDB4YWVkNTFlM2QsIDB4MmQzOTI3MzYsIDB4MGZkOTY0MGEsIDB4NWNhNjIxNjgsIDB4NWI1NGQxOWIsIDB4MzYyZTNhMjQsIDB4MGE2N2IxMGMsIDB4NTdlNzBmOTMsIDB4ZWU5NmQyYjQsIDB4OWI5MTllMWIsIDB4YzBjNTRmODAsIDB4ZGMyMGEyNjEsIDB4Nzc0YjY5NWEsIDB4MTIxYTE2MWMsIDB4OTNiYTBhZTIsIDB4YTAyYWU1YzAsIDB4MjJlMDQzM2MsIDB4MWIxNzFkMTIsIDB4MDkwZDBiMGUsIDB4OGJjN2FkZjIsIDB4YjZhOGI5MmQsIDB4MWVhOWM4MTQsIDB4ZjExOTg1NTcsIDB4NzUwNzRjYWYsIDB4OTlkZGJiZWUsIDB4N2Y2MGZkYTMsIDB4MDEyNjlmZjcsIDB4NzJmNWJjNWMsIDB4NjYzYmM1NDQsIDB4ZmI3ZTM0NWIsIDB4NDMyOTc2OGIsIDB4MjNjNmRjY2IsIDB4ZWRmYzY4YjYsIDB4ZTRmMTYzYjgsIDB4MzFkY2NhZDcsIDB4NjM4NTEwNDIsIDB4OTcyMjQwMTMsIDB4YzYxMTIwODQsIDB4NGEyNDdkODUsIDB4YmIzZGY4ZDIsIDB4ZjkzMjExYWUsIDB4MjlhMTZkYzcsIDB4OWUyZjRiMWQsIDB4YjIzMGYzZGMsIDB4ODY1MmVjMGQsIDB4YzFlM2QwNzcsIDB4YjMxNjZjMmIsIDB4NzBiOTk5YTksIDB4OTQ0OGZhMTEsIDB4ZTk2NDIyNDcsIDB4ZmM4Y2M0YTgsIDB4ZjAzZjFhYTAsIDB4N2QyY2Q4NTYsIDB4MzM5MGVmMjIsIDB4NDk0ZWM3ODcsIDB4MzhkMWMxZDksIDB4Y2FhMmZlOGMsIDB4ZDQwYjM2OTgsIDB4ZjU4MWNmYTYsIDB4N2FkZTI4YTUsIDB4Yjc4ZTI2ZGEsIDB4YWRiZmE0M2YsIDB4M2E5ZGU0MmMsIDB4Nzg5MjBkNTAsIDB4NWZjYzliNmEsIDB4N2U0NjYyNTQsIDB4OGQxM2MyZjYsIDB4ZDhiOGU4OTAsIDB4MzlmNzVlMmUsIDB4YzNhZmY1ODIsIDB4NWQ4MGJlOWYsIDB4ZDA5MzdjNjksIDB4ZDUyZGE5NmYsIDB4MjUxMmIzY2YsIDB4YWM5OTNiYzgsIDB4MTg3ZGE3MTAsIDB4OWM2MzZlZTgsIDB4M2JiYjdiZGIsIDB4MjY3ODA5Y2QsIDB4NTkxOGY0NmUsIDB4OWFiNzAxZWMsIDB4NGY5YWE4ODMsIDB4OTU2ZTY1ZTYsIDB4ZmZlNjdlYWEsIDB4YmNjZjA4MjEsIDB4MTVlOGU2ZWYsIDB4ZTc5YmQ5YmEsIDB4NmYzNmNlNGEsIDB4OWYwOWQ0ZWEsIDB4YjA3Y2Q2MjksIDB4YTRiMmFmMzEsIDB4M2YyMzMxMmEsIDB4YTU5NDMwYzYsIDB4YTI2NmMwMzUsIDB4NGViYzM3NzQsIDB4ODJjYWE2ZmMsIDB4OTBkMGIwZTAsIDB4YTdkODE1MzMsIDB4MDQ5ODRhZjEsIDB4ZWNkYWY3NDEsIDB4Y2Q1MDBlN2YsIDB4OTFmNjJmMTcsIDB4NGRkNjhkNzYsIDB4ZWZiMDRkNDMsIDB4YWE0ZDU0Y2MsIDB4OTYwNGRmZTQsIDB4ZDFiNWUzOWUsIDB4NmE4ODFiNGMsIDB4MmMxZmI4YzEsIDB4NjU1MTdmNDYsIDB4NWVlYTA0OWQsIDB4OGMzNTVkMDEsIDB4ODc3NDczZmEsIDB4MGI0MTJlZmIsIDB4NjcxZDVhYjMsIDB4ZGJkMjUyOTIsIDB4MTA1NjMzZTksIDB4ZDY0NzEzNmQsIDB4ZDc2MThjOWEsIDB4YTEwYzdhMzcsIDB4ZjgxNDhlNTksIDB4MTMzYzg5ZWIsIDB4YTkyN2VlY2UsIDB4NjFjOTM1YjcsIDB4MWNlNWVkZTEsIDB4NDdiMTNjN2EsIDB4ZDJkZjU5OWMsIDB4ZjI3MzNmNTUsIDB4MTRjZTc5MTgsIDB4YzczN2JmNzMsIDB4ZjdjZGVhNTMsIDB4ZmRhYTViNWYsIDB4M2Q2ZjE0ZGYsIDB4NDRkYjg2NzgsIDB4YWZmMzgxY2EsIDB4NjhjNDNlYjksIDB4MjQzNDJjMzgsIDB4YTM0MDVmYzIsIDB4MWRjMzcyMTYsIDB4ZTIyNTBjYmMsIDB4M2M0OThiMjgsIDB4MGQ5NTQxZmYsIDB4YTgwMTcxMzksIDB4MGNiM2RlMDgsIDB4YjRlNDljZDgsIDB4NTZjMTkwNjQsIDB4Y2I4NDYxN2IsIDB4MzJiNjcwZDUsIDB4NmM1Yzc0NDgsIDB4Yjg1NzQyZDBdO1xuXG4gICAgLy8gVHJhbnNmb3JtYXRpb25zIGZvciBkZWNyeXB0aW9uIGtleSBleHBhbnNpb25cbiAgICB2YXIgVTEgPSBbMHgwMDAwMDAwMCwgMHgwZTA5MGQwYiwgMHgxYzEyMWExNiwgMHgxMjFiMTcxZCwgMHgzODI0MzQyYywgMHgzNjJkMzkyNywgMHgyNDM2MmUzYSwgMHgyYTNmMjMzMSwgMHg3MDQ4Njg1OCwgMHg3ZTQxNjU1MywgMHg2YzVhNzI0ZSwgMHg2MjUzN2Y0NSwgMHg0ODZjNWM3NCwgMHg0NjY1NTE3ZiwgMHg1NDdlNDY2MiwgMHg1YTc3NGI2OSwgMHhlMDkwZDBiMCwgMHhlZTk5ZGRiYiwgMHhmYzgyY2FhNiwgMHhmMjhiYzdhZCwgMHhkOGI0ZTQ5YywgMHhkNmJkZTk5NywgMHhjNGE2ZmU4YSwgMHhjYWFmZjM4MSwgMHg5MGQ4YjhlOCwgMHg5ZWQxYjVlMywgMHg4Y2NhYTJmZSwgMHg4MmMzYWZmNSwgMHhhOGZjOGNjNCwgMHhhNmY1ODFjZiwgMHhiNGVlOTZkMiwgMHhiYWU3OWJkOSwgMHhkYjNiYmI3YiwgMHhkNTMyYjY3MCwgMHhjNzI5YTE2ZCwgMHhjOTIwYWM2NiwgMHhlMzFmOGY1NywgMHhlZDE2ODI1YywgMHhmZjBkOTU0MSwgMHhmMTA0OTg0YSwgMHhhYjczZDMyMywgMHhhNTdhZGUyOCwgMHhiNzYxYzkzNSwgMHhiOTY4YzQzZSwgMHg5MzU3ZTcwZiwgMHg5ZDVlZWEwNCwgMHg4ZjQ1ZmQxOSwgMHg4MTRjZjAxMiwgMHgzYmFiNmJjYiwgMHgzNWEyNjZjMCwgMHgyN2I5NzFkZCwgMHgyOWIwN2NkNiwgMHgwMzhmNWZlNywgMHgwZDg2NTJlYywgMHgxZjlkNDVmMSwgMHgxMTk0NDhmYSwgMHg0YmUzMDM5MywgMHg0NWVhMGU5OCwgMHg1N2YxMTk4NSwgMHg1OWY4MTQ4ZSwgMHg3M2M3MzdiZiwgMHg3ZGNlM2FiNCwgMHg2ZmQ1MmRhOSwgMHg2MWRjMjBhMiwgMHhhZDc2NmRmNiwgMHhhMzdmNjBmZCwgMHhiMTY0NzdlMCwgMHhiZjZkN2FlYiwgMHg5NTUyNTlkYSwgMHg5YjViNTRkMSwgMHg4OTQwNDNjYywgMHg4NzQ5NGVjNywgMHhkZDNlMDVhZSwgMHhkMzM3MDhhNSwgMHhjMTJjMWZiOCwgMHhjZjI1MTJiMywgMHhlNTFhMzE4MiwgMHhlYjEzM2M4OSwgMHhmOTA4MmI5NCwgMHhmNzAxMjY5ZiwgMHg0ZGU2YmQ0NiwgMHg0M2VmYjA0ZCwgMHg1MWY0YTc1MCwgMHg1ZmZkYWE1YiwgMHg3NWMyODk2YSwgMHg3YmNiODQ2MSwgMHg2OWQwOTM3YywgMHg2N2Q5OWU3NywgMHgzZGFlZDUxZSwgMHgzM2E3ZDgxNSwgMHgyMWJjY2YwOCwgMHgyZmI1YzIwMywgMHgwNThhZTEzMiwgMHgwYjgzZWMzOSwgMHgxOTk4ZmIyNCwgMHgxNzkxZjYyZiwgMHg3NjRkZDY4ZCwgMHg3ODQ0ZGI4NiwgMHg2YTVmY2M5YiwgMHg2NDU2YzE5MCwgMHg0ZTY5ZTJhMSwgMHg0MDYwZWZhYSwgMHg1MjdiZjhiNywgMHg1YzcyZjViYywgMHgwNjA1YmVkNSwgMHgwODBjYjNkZSwgMHgxYTE3YTRjMywgMHgxNDFlYTljOCwgMHgzZTIxOGFmOSwgMHgzMDI4ODdmMiwgMHgyMjMzOTBlZiwgMHgyYzNhOWRlNCwgMHg5NmRkMDYzZCwgMHg5OGQ0MGIzNiwgMHg4YWNmMWMyYiwgMHg4NGM2MTEyMCwgMHhhZWY5MzIxMSwgMHhhMGYwM2YxYSwgMHhiMmViMjgwNywgMHhiY2UyMjUwYywgMHhlNjk1NmU2NSwgMHhlODljNjM2ZSwgMHhmYTg3NzQ3MywgMHhmNDhlNzk3OCwgMHhkZWIxNWE0OSwgMHhkMGI4NTc0MiwgMHhjMmEzNDA1ZiwgMHhjY2FhNGQ1NCwgMHg0MWVjZGFmNywgMHg0ZmU1ZDdmYywgMHg1ZGZlYzBlMSwgMHg1M2Y3Y2RlYSwgMHg3OWM4ZWVkYiwgMHg3N2MxZTNkMCwgMHg2NWRhZjRjZCwgMHg2YmQzZjljNiwgMHgzMWE0YjJhZiwgMHgzZmFkYmZhNCwgMHgyZGI2YThiOSwgMHgyM2JmYTViMiwgMHgwOTgwODY4MywgMHgwNzg5OGI4OCwgMHgxNTkyOWM5NSwgMHgxYjliOTE5ZSwgMHhhMTdjMGE0NywgMHhhZjc1MDc0YywgMHhiZDZlMTA1MSwgMHhiMzY3MWQ1YSwgMHg5OTU4M2U2YiwgMHg5NzUxMzM2MCwgMHg4NTRhMjQ3ZCwgMHg4YjQzMjk3NiwgMHhkMTM0NjIxZiwgMHhkZjNkNmYxNCwgMHhjZDI2NzgwOSwgMHhjMzJmNzUwMiwgMHhlOTEwNTYzMywgMHhlNzE5NWIzOCwgMHhmNTAyNGMyNSwgMHhmYjBiNDEyZSwgMHg5YWQ3NjE4YywgMHg5NGRlNmM4NywgMHg4NmM1N2I5YSwgMHg4OGNjNzY5MSwgMHhhMmYzNTVhMCwgMHhhY2ZhNThhYiwgMHhiZWUxNGZiNiwgMHhiMGU4NDJiZCwgMHhlYTlmMDlkNCwgMHhlNDk2MDRkZiwgMHhmNjhkMTNjMiwgMHhmODg0MWVjOSwgMHhkMmJiM2RmOCwgMHhkY2IyMzBmMywgMHhjZWE5MjdlZSwgMHhjMGEwMmFlNSwgMHg3YTQ3YjEzYywgMHg3NDRlYmMzNywgMHg2NjU1YWIyYSwgMHg2ODVjYTYyMSwgMHg0MjYzODUxMCwgMHg0YzZhODgxYiwgMHg1ZTcxOWYwNiwgMHg1MDc4OTIwZCwgMHgwYTBmZDk2NCwgMHgwNDA2ZDQ2ZiwgMHgxNjFkYzM3MiwgMHgxODE0Y2U3OSwgMHgzMjJiZWQ0OCwgMHgzYzIyZTA0MywgMHgyZTM5Zjc1ZSwgMHgyMDMwZmE1NSwgMHhlYzlhYjcwMSwgMHhlMjkzYmEwYSwgMHhmMDg4YWQxNywgMHhmZTgxYTAxYywgMHhkNGJlODMyZCwgMHhkYWI3OGUyNiwgMHhjOGFjOTkzYiwgMHhjNmE1OTQzMCwgMHg5Y2QyZGY1OSwgMHg5MmRiZDI1MiwgMHg4MGMwYzU0ZiwgMHg4ZWM5Yzg0NCwgMHhhNGY2ZWI3NSwgMHhhYWZmZTY3ZSwgMHhiOGU0ZjE2MywgMHhiNmVkZmM2OCwgMHgwYzBhNjdiMSwgMHgwMjAzNmFiYSwgMHgxMDE4N2RhNywgMHgxZTExNzBhYywgMHgzNDJlNTM5ZCwgMHgzYTI3NWU5NiwgMHgyODNjNDk4YiwgMHgyNjM1NDQ4MCwgMHg3YzQyMGZlOSwgMHg3MjRiMDJlMiwgMHg2MDUwMTVmZiwgMHg2ZTU5MThmNCwgMHg0NDY2M2JjNSwgMHg0YTZmMzZjZSwgMHg1ODc0MjFkMywgMHg1NjdkMmNkOCwgMHgzN2ExMGM3YSwgMHgzOWE4MDE3MSwgMHgyYmIzMTY2YywgMHgyNWJhMWI2NywgMHgwZjg1Mzg1NiwgMHgwMThjMzU1ZCwgMHgxMzk3MjI0MCwgMHgxZDllMmY0YiwgMHg0N2U5NjQyMiwgMHg0OWUwNjkyOSwgMHg1YmZiN2UzNCwgMHg1NWYyNzMzZiwgMHg3ZmNkNTAwZSwgMHg3MWM0NWQwNSwgMHg2M2RmNGExOCwgMHg2ZGQ2NDcxMywgMHhkNzMxZGNjYSwgMHhkOTM4ZDFjMSwgMHhjYjIzYzZkYywgMHhjNTJhY2JkNywgMHhlZjE1ZThlNiwgMHhlMTFjZTVlZCwgMHhmMzA3ZjJmMCwgMHhmZDBlZmZmYiwgMHhhNzc5YjQ5MiwgMHhhOTcwYjk5OSwgMHhiYjZiYWU4NCwgMHhiNTYyYTM4ZiwgMHg5ZjVkODBiZSwgMHg5MTU0OGRiNSwgMHg4MzRmOWFhOCwgMHg4ZDQ2OTdhM107XG4gICAgdmFyIFUyID0gWzB4MDAwMDAwMDAsIDB4MGIwZTA5MGQsIDB4MTYxYzEyMWEsIDB4MWQxMjFiMTcsIDB4MmMzODI0MzQsIDB4MjczNjJkMzksIDB4M2EyNDM2MmUsIDB4MzEyYTNmMjMsIDB4NTg3MDQ4NjgsIDB4NTM3ZTQxNjUsIDB4NGU2YzVhNzIsIDB4NDU2MjUzN2YsIDB4NzQ0ODZjNWMsIDB4N2Y0NjY1NTEsIDB4NjI1NDdlNDYsIDB4Njk1YTc3NGIsIDB4YjBlMDkwZDAsIDB4YmJlZTk5ZGQsIDB4YTZmYzgyY2EsIDB4YWRmMjhiYzcsIDB4OWNkOGI0ZTQsIDB4OTdkNmJkZTksIDB4OGFjNGE2ZmUsIDB4ODFjYWFmZjMsIDB4ZTg5MGQ4YjgsIDB4ZTM5ZWQxYjUsIDB4ZmU4Y2NhYTIsIDB4ZjU4MmMzYWYsIDB4YzRhOGZjOGMsIDB4Y2ZhNmY1ODEsIDB4ZDJiNGVlOTYsIDB4ZDliYWU3OWIsIDB4N2JkYjNiYmIsIDB4NzBkNTMyYjYsIDB4NmRjNzI5YTEsIDB4NjZjOTIwYWMsIDB4NTdlMzFmOGYsIDB4NWNlZDE2ODIsIDB4NDFmZjBkOTUsIDB4NGFmMTA0OTgsIDB4MjNhYjczZDMsIDB4MjhhNTdhZGUsIDB4MzViNzYxYzksIDB4M2ViOTY4YzQsIDB4MGY5MzU3ZTcsIDB4MDQ5ZDVlZWEsIDB4MTk4ZjQ1ZmQsIDB4MTI4MTRjZjAsIDB4Y2IzYmFiNmIsIDB4YzAzNWEyNjYsIDB4ZGQyN2I5NzEsIDB4ZDYyOWIwN2MsIDB4ZTcwMzhmNWYsIDB4ZWMwZDg2NTIsIDB4ZjExZjlkNDUsIDB4ZmExMTk0NDgsIDB4OTM0YmUzMDMsIDB4OTg0NWVhMGUsIDB4ODU1N2YxMTksIDB4OGU1OWY4MTQsIDB4YmY3M2M3MzcsIDB4YjQ3ZGNlM2EsIDB4YTk2ZmQ1MmQsIDB4YTI2MWRjMjAsIDB4ZjZhZDc2NmQsIDB4ZmRhMzdmNjAsIDB4ZTBiMTY0NzcsIDB4ZWJiZjZkN2EsIDB4ZGE5NTUyNTksIDB4ZDE5YjViNTQsIDB4Y2M4OTQwNDMsIDB4Yzc4NzQ5NGUsIDB4YWVkZDNlMDUsIDB4YTVkMzM3MDgsIDB4YjhjMTJjMWYsIDB4YjNjZjI1MTIsIDB4ODJlNTFhMzEsIDB4ODllYjEzM2MsIDB4OTRmOTA4MmIsIDB4OWZmNzAxMjYsIDB4NDY0ZGU2YmQsIDB4NGQ0M2VmYjAsIDB4NTA1MWY0YTcsIDB4NWI1ZmZkYWEsIDB4NmE3NWMyODksIDB4NjE3YmNiODQsIDB4N2M2OWQwOTMsIDB4Nzc2N2Q5OWUsIDB4MWUzZGFlZDUsIDB4MTUzM2E3ZDgsIDB4MDgyMWJjY2YsIDB4MDMyZmI1YzIsIDB4MzIwNThhZTEsIDB4MzkwYjgzZWMsIDB4MjQxOTk4ZmIsIDB4MmYxNzkxZjYsIDB4OGQ3NjRkZDYsIDB4ODY3ODQ0ZGIsIDB4OWI2YTVmY2MsIDB4OTA2NDU2YzEsIDB4YTE0ZTY5ZTIsIDB4YWE0MDYwZWYsIDB4Yjc1MjdiZjgsIDB4YmM1YzcyZjUsIDB4ZDUwNjA1YmUsIDB4ZGUwODBjYjMsIDB4YzMxYTE3YTQsIDB4YzgxNDFlYTksIDB4ZjkzZTIxOGEsIDB4ZjIzMDI4ODcsIDB4ZWYyMjMzOTAsIDB4ZTQyYzNhOWQsIDB4M2Q5NmRkMDYsIDB4MzY5OGQ0MGIsIDB4MmI4YWNmMWMsIDB4MjA4NGM2MTEsIDB4MTFhZWY5MzIsIDB4MWFhMGYwM2YsIDB4MDdiMmViMjgsIDB4MGNiY2UyMjUsIDB4NjVlNjk1NmUsIDB4NmVlODljNjMsIDB4NzNmYTg3NzQsIDB4NzhmNDhlNzksIDB4NDlkZWIxNWEsIDB4NDJkMGI4NTcsIDB4NWZjMmEzNDAsIDB4NTRjY2FhNGQsIDB4Zjc0MWVjZGEsIDB4ZmM0ZmU1ZDcsIDB4ZTE1ZGZlYzAsIDB4ZWE1M2Y3Y2QsIDB4ZGI3OWM4ZWUsIDB4ZDA3N2MxZTMsIDB4Y2Q2NWRhZjQsIDB4YzY2YmQzZjksIDB4YWYzMWE0YjIsIDB4YTQzZmFkYmYsIDB4YjkyZGI2YTgsIDB4YjIyM2JmYTUsIDB4ODMwOTgwODYsIDB4ODgwNzg5OGIsIDB4OTUxNTkyOWMsIDB4OWUxYjliOTEsIDB4NDdhMTdjMGEsIDB4NGNhZjc1MDcsIDB4NTFiZDZlMTAsIDB4NWFiMzY3MWQsIDB4NmI5OTU4M2UsIDB4NjA5NzUxMzMsIDB4N2Q4NTRhMjQsIDB4NzY4YjQzMjksIDB4MWZkMTM0NjIsIDB4MTRkZjNkNmYsIDB4MDljZDI2NzgsIDB4MDJjMzJmNzUsIDB4MzNlOTEwNTYsIDB4MzhlNzE5NWIsIDB4MjVmNTAyNGMsIDB4MmVmYjBiNDEsIDB4OGM5YWQ3NjEsIDB4ODc5NGRlNmMsIDB4OWE4NmM1N2IsIDB4OTE4OGNjNzYsIDB4YTBhMmYzNTUsIDB4YWJhY2ZhNTgsIDB4YjZiZWUxNGYsIDB4YmRiMGU4NDIsIDB4ZDRlYTlmMDksIDB4ZGZlNDk2MDQsIDB4YzJmNjhkMTMsIDB4YzlmODg0MWUsIDB4ZjhkMmJiM2QsIDB4ZjNkY2IyMzAsIDB4ZWVjZWE5MjcsIDB4ZTVjMGEwMmEsIDB4M2M3YTQ3YjEsIDB4Mzc3NDRlYmMsIDB4MmE2NjU1YWIsIDB4MjE2ODVjYTYsIDB4MTA0MjYzODUsIDB4MWI0YzZhODgsIDB4MDY1ZTcxOWYsIDB4MGQ1MDc4OTIsIDB4NjQwYTBmZDksIDB4NmYwNDA2ZDQsIDB4NzIxNjFkYzMsIDB4NzkxODE0Y2UsIDB4NDgzMjJiZWQsIDB4NDMzYzIyZTAsIDB4NWUyZTM5ZjcsIDB4NTUyMDMwZmEsIDB4MDFlYzlhYjcsIDB4MGFlMjkzYmEsIDB4MTdmMDg4YWQsIDB4MWNmZTgxYTAsIDB4MmRkNGJlODMsIDB4MjZkYWI3OGUsIDB4M2JjOGFjOTksIDB4MzBjNmE1OTQsIDB4NTk5Y2QyZGYsIDB4NTI5MmRiZDIsIDB4NGY4MGMwYzUsIDB4NDQ4ZWM5YzgsIDB4NzVhNGY2ZWIsIDB4N2VhYWZmZTYsIDB4NjNiOGU0ZjEsIDB4NjhiNmVkZmMsIDB4YjEwYzBhNjcsIDB4YmEwMjAzNmEsIDB4YTcxMDE4N2QsIDB4YWMxZTExNzAsIDB4OWQzNDJlNTMsIDB4OTYzYTI3NWUsIDB4OGIyODNjNDksIDB4ODAyNjM1NDQsIDB4ZTk3YzQyMGYsIDB4ZTI3MjRiMDIsIDB4ZmY2MDUwMTUsIDB4ZjQ2ZTU5MTgsIDB4YzU0NDY2M2IsIDB4Y2U0YTZmMzYsIDB4ZDM1ODc0MjEsIDB4ZDg1NjdkMmMsIDB4N2EzN2ExMGMsIDB4NzEzOWE4MDEsIDB4NmMyYmIzMTYsIDB4NjcyNWJhMWIsIDB4NTYwZjg1MzgsIDB4NWQwMThjMzUsIDB4NDAxMzk3MjIsIDB4NGIxZDllMmYsIDB4MjI0N2U5NjQsIDB4Mjk0OWUwNjksIDB4MzQ1YmZiN2UsIDB4M2Y1NWYyNzMsIDB4MGU3ZmNkNTAsIDB4MDU3MWM0NWQsIDB4MTg2M2RmNGEsIDB4MTM2ZGQ2NDcsIDB4Y2FkNzMxZGMsIDB4YzFkOTM4ZDEsIDB4ZGNjYjIzYzYsIDB4ZDdjNTJhY2IsIDB4ZTZlZjE1ZTgsIDB4ZWRlMTFjZTUsIDB4ZjBmMzA3ZjIsIDB4ZmJmZDBlZmYsIDB4OTJhNzc5YjQsIDB4OTlhOTcwYjksIDB4ODRiYjZiYWUsIDB4OGZiNTYyYTMsIDB4YmU5ZjVkODAsIDB4YjU5MTU0OGQsIDB4YTg4MzRmOWEsIDB4YTM4ZDQ2OTddO1xuICAgIHZhciBVMyA9IFsweDAwMDAwMDAwLCAweDBkMGIwZTA5LCAweDFhMTYxYzEyLCAweDE3MWQxMjFiLCAweDM0MmMzODI0LCAweDM5MjczNjJkLCAweDJlM2EyNDM2LCAweDIzMzEyYTNmLCAweDY4NTg3MDQ4LCAweDY1NTM3ZTQxLCAweDcyNGU2YzVhLCAweDdmNDU2MjUzLCAweDVjNzQ0ODZjLCAweDUxN2Y0NjY1LCAweDQ2NjI1NDdlLCAweDRiNjk1YTc3LCAweGQwYjBlMDkwLCAweGRkYmJlZTk5LCAweGNhYTZmYzgyLCAweGM3YWRmMjhiLCAweGU0OWNkOGI0LCAweGU5OTdkNmJkLCAweGZlOGFjNGE2LCAweGYzODFjYWFmLCAweGI4ZTg5MGQ4LCAweGI1ZTM5ZWQxLCAweGEyZmU4Y2NhLCAweGFmZjU4MmMzLCAweDhjYzRhOGZjLCAweDgxY2ZhNmY1LCAweDk2ZDJiNGVlLCAweDliZDliYWU3LCAweGJiN2JkYjNiLCAweGI2NzBkNTMyLCAweGExNmRjNzI5LCAweGFjNjZjOTIwLCAweDhmNTdlMzFmLCAweDgyNWNlZDE2LCAweDk1NDFmZjBkLCAweDk4NGFmMTA0LCAweGQzMjNhYjczLCAweGRlMjhhNTdhLCAweGM5MzViNzYxLCAweGM0M2ViOTY4LCAweGU3MGY5MzU3LCAweGVhMDQ5ZDVlLCAweGZkMTk4ZjQ1LCAweGYwMTI4MTRjLCAweDZiY2IzYmFiLCAweDY2YzAzNWEyLCAweDcxZGQyN2I5LCAweDdjZDYyOWIwLCAweDVmZTcwMzhmLCAweDUyZWMwZDg2LCAweDQ1ZjExZjlkLCAweDQ4ZmExMTk0LCAweDAzOTM0YmUzLCAweDBlOTg0NWVhLCAweDE5ODU1N2YxLCAweDE0OGU1OWY4LCAweDM3YmY3M2M3LCAweDNhYjQ3ZGNlLCAweDJkYTk2ZmQ1LCAweDIwYTI2MWRjLCAweDZkZjZhZDc2LCAweDYwZmRhMzdmLCAweDc3ZTBiMTY0LCAweDdhZWJiZjZkLCAweDU5ZGE5NTUyLCAweDU0ZDE5YjViLCAweDQzY2M4OTQwLCAweDRlYzc4NzQ5LCAweDA1YWVkZDNlLCAweDA4YTVkMzM3LCAweDFmYjhjMTJjLCAweDEyYjNjZjI1LCAweDMxODJlNTFhLCAweDNjODllYjEzLCAweDJiOTRmOTA4LCAweDI2OWZmNzAxLCAweGJkNDY0ZGU2LCAweGIwNGQ0M2VmLCAweGE3NTA1MWY0LCAweGFhNWI1ZmZkLCAweDg5NmE3NWMyLCAweDg0NjE3YmNiLCAweDkzN2M2OWQwLCAweDllNzc2N2Q5LCAweGQ1MWUzZGFlLCAweGQ4MTUzM2E3LCAweGNmMDgyMWJjLCAweGMyMDMyZmI1LCAweGUxMzIwNThhLCAweGVjMzkwYjgzLCAweGZiMjQxOTk4LCAweGY2MmYxNzkxLCAweGQ2OGQ3NjRkLCAweGRiODY3ODQ0LCAweGNjOWI2YTVmLCAweGMxOTA2NDU2LCAweGUyYTE0ZTY5LCAweGVmYWE0MDYwLCAweGY4Yjc1MjdiLCAweGY1YmM1YzcyLCAweGJlZDUwNjA1LCAweGIzZGUwODBjLCAweGE0YzMxYTE3LCAweGE5YzgxNDFlLCAweDhhZjkzZTIxLCAweDg3ZjIzMDI4LCAweDkwZWYyMjMzLCAweDlkZTQyYzNhLCAweDA2M2Q5NmRkLCAweDBiMzY5OGQ0LCAweDFjMmI4YWNmLCAweDExMjA4NGM2LCAweDMyMTFhZWY5LCAweDNmMWFhMGYwLCAweDI4MDdiMmViLCAweDI1MGNiY2UyLCAweDZlNjVlNjk1LCAweDYzNmVlODljLCAweDc0NzNmYTg3LCAweDc5NzhmNDhlLCAweDVhNDlkZWIxLCAweDU3NDJkMGI4LCAweDQwNWZjMmEzLCAweDRkNTRjY2FhLCAweGRhZjc0MWVjLCAweGQ3ZmM0ZmU1LCAweGMwZTE1ZGZlLCAweGNkZWE1M2Y3LCAweGVlZGI3OWM4LCAweGUzZDA3N2MxLCAweGY0Y2Q2NWRhLCAweGY5YzY2YmQzLCAweGIyYWYzMWE0LCAweGJmYTQzZmFkLCAweGE4YjkyZGI2LCAweGE1YjIyM2JmLCAweDg2ODMwOTgwLCAweDhiODgwNzg5LCAweDljOTUxNTkyLCAweDkxOWUxYjliLCAweDBhNDdhMTdjLCAweDA3NGNhZjc1LCAweDEwNTFiZDZlLCAweDFkNWFiMzY3LCAweDNlNmI5OTU4LCAweDMzNjA5NzUxLCAweDI0N2Q4NTRhLCAweDI5NzY4YjQzLCAweDYyMWZkMTM0LCAweDZmMTRkZjNkLCAweDc4MDljZDI2LCAweDc1MDJjMzJmLCAweDU2MzNlOTEwLCAweDViMzhlNzE5LCAweDRjMjVmNTAyLCAweDQxMmVmYjBiLCAweDYxOGM5YWQ3LCAweDZjODc5NGRlLCAweDdiOWE4NmM1LCAweDc2OTE4OGNjLCAweDU1YTBhMmYzLCAweDU4YWJhY2ZhLCAweDRmYjZiZWUxLCAweDQyYmRiMGU4LCAweDA5ZDRlYTlmLCAweDA0ZGZlNDk2LCAweDEzYzJmNjhkLCAweDFlYzlmODg0LCAweDNkZjhkMmJiLCAweDMwZjNkY2IyLCAweDI3ZWVjZWE5LCAweDJhZTVjMGEwLCAweGIxM2M3YTQ3LCAweGJjMzc3NDRlLCAweGFiMmE2NjU1LCAweGE2MjE2ODVjLCAweDg1MTA0MjYzLCAweDg4MWI0YzZhLCAweDlmMDY1ZTcxLCAweDkyMGQ1MDc4LCAweGQ5NjQwYTBmLCAweGQ0NmYwNDA2LCAweGMzNzIxNjFkLCAweGNlNzkxODE0LCAweGVkNDgzMjJiLCAweGUwNDMzYzIyLCAweGY3NWUyZTM5LCAweGZhNTUyMDMwLCAweGI3MDFlYzlhLCAweGJhMGFlMjkzLCAweGFkMTdmMDg4LCAweGEwMWNmZTgxLCAweDgzMmRkNGJlLCAweDhlMjZkYWI3LCAweDk5M2JjOGFjLCAweDk0MzBjNmE1LCAweGRmNTk5Y2QyLCAweGQyNTI5MmRiLCAweGM1NGY4MGMwLCAweGM4NDQ4ZWM5LCAweGViNzVhNGY2LCAweGU2N2VhYWZmLCAweGYxNjNiOGU0LCAweGZjNjhiNmVkLCAweDY3YjEwYzBhLCAweDZhYmEwMjAzLCAweDdkYTcxMDE4LCAweDcwYWMxZTExLCAweDUzOWQzNDJlLCAweDVlOTYzYTI3LCAweDQ5OGIyODNjLCAweDQ0ODAyNjM1LCAweDBmZTk3YzQyLCAweDAyZTI3MjRiLCAweDE1ZmY2MDUwLCAweDE4ZjQ2ZTU5LCAweDNiYzU0NDY2LCAweDM2Y2U0YTZmLCAweDIxZDM1ODc0LCAweDJjZDg1NjdkLCAweDBjN2EzN2ExLCAweDAxNzEzOWE4LCAweDE2NmMyYmIzLCAweDFiNjcyNWJhLCAweDM4NTYwZjg1LCAweDM1NWQwMThjLCAweDIyNDAxMzk3LCAweDJmNGIxZDllLCAweDY0MjI0N2U5LCAweDY5Mjk0OWUwLCAweDdlMzQ1YmZiLCAweDczM2Y1NWYyLCAweDUwMGU3ZmNkLCAweDVkMDU3MWM0LCAweDRhMTg2M2RmLCAweDQ3MTM2ZGQ2LCAweGRjY2FkNzMxLCAweGQxYzFkOTM4LCAweGM2ZGNjYjIzLCAweGNiZDdjNTJhLCAweGU4ZTZlZjE1LCAweGU1ZWRlMTFjLCAweGYyZjBmMzA3LCAweGZmZmJmZDBlLCAweGI0OTJhNzc5LCAweGI5OTlhOTcwLCAweGFlODRiYjZiLCAweGEzOGZiNTYyLCAweDgwYmU5ZjVkLCAweDhkYjU5MTU0LCAweDlhYTg4MzRmLCAweDk3YTM4ZDQ2XTtcbiAgICB2YXIgVTQgPSBbMHgwMDAwMDAwMCwgMHgwOTBkMGIwZSwgMHgxMjFhMTYxYywgMHgxYjE3MWQxMiwgMHgyNDM0MmMzOCwgMHgyZDM5MjczNiwgMHgzNjJlM2EyNCwgMHgzZjIzMzEyYSwgMHg0ODY4NTg3MCwgMHg0MTY1NTM3ZSwgMHg1YTcyNGU2YywgMHg1MzdmNDU2MiwgMHg2YzVjNzQ0OCwgMHg2NTUxN2Y0NiwgMHg3ZTQ2NjI1NCwgMHg3NzRiNjk1YSwgMHg5MGQwYjBlMCwgMHg5OWRkYmJlZSwgMHg4MmNhYTZmYywgMHg4YmM3YWRmMiwgMHhiNGU0OWNkOCwgMHhiZGU5OTdkNiwgMHhhNmZlOGFjNCwgMHhhZmYzODFjYSwgMHhkOGI4ZTg5MCwgMHhkMWI1ZTM5ZSwgMHhjYWEyZmU4YywgMHhjM2FmZjU4MiwgMHhmYzhjYzRhOCwgMHhmNTgxY2ZhNiwgMHhlZTk2ZDJiNCwgMHhlNzliZDliYSwgMHgzYmJiN2JkYiwgMHgzMmI2NzBkNSwgMHgyOWExNmRjNywgMHgyMGFjNjZjOSwgMHgxZjhmNTdlMywgMHgxNjgyNWNlZCwgMHgwZDk1NDFmZiwgMHgwNDk4NGFmMSwgMHg3M2QzMjNhYiwgMHg3YWRlMjhhNSwgMHg2MWM5MzViNywgMHg2OGM0M2ViOSwgMHg1N2U3MGY5MywgMHg1ZWVhMDQ5ZCwgMHg0NWZkMTk4ZiwgMHg0Y2YwMTI4MSwgMHhhYjZiY2IzYiwgMHhhMjY2YzAzNSwgMHhiOTcxZGQyNywgMHhiMDdjZDYyOSwgMHg4ZjVmZTcwMywgMHg4NjUyZWMwZCwgMHg5ZDQ1ZjExZiwgMHg5NDQ4ZmExMSwgMHhlMzAzOTM0YiwgMHhlYTBlOTg0NSwgMHhmMTE5ODU1NywgMHhmODE0OGU1OSwgMHhjNzM3YmY3MywgMHhjZTNhYjQ3ZCwgMHhkNTJkYTk2ZiwgMHhkYzIwYTI2MSwgMHg3NjZkZjZhZCwgMHg3ZjYwZmRhMywgMHg2NDc3ZTBiMSwgMHg2ZDdhZWJiZiwgMHg1MjU5ZGE5NSwgMHg1YjU0ZDE5YiwgMHg0MDQzY2M4OSwgMHg0OTRlYzc4NywgMHgzZTA1YWVkZCwgMHgzNzA4YTVkMywgMHgyYzFmYjhjMSwgMHgyNTEyYjNjZiwgMHgxYTMxODJlNSwgMHgxMzNjODllYiwgMHgwODJiOTRmOSwgMHgwMTI2OWZmNywgMHhlNmJkNDY0ZCwgMHhlZmIwNGQ0MywgMHhmNGE3NTA1MSwgMHhmZGFhNWI1ZiwgMHhjMjg5NmE3NSwgMHhjYjg0NjE3YiwgMHhkMDkzN2M2OSwgMHhkOTllNzc2NywgMHhhZWQ1MWUzZCwgMHhhN2Q4MTUzMywgMHhiY2NmMDgyMSwgMHhiNWMyMDMyZiwgMHg4YWUxMzIwNSwgMHg4M2VjMzkwYiwgMHg5OGZiMjQxOSwgMHg5MWY2MmYxNywgMHg0ZGQ2OGQ3NiwgMHg0NGRiODY3OCwgMHg1ZmNjOWI2YSwgMHg1NmMxOTA2NCwgMHg2OWUyYTE0ZSwgMHg2MGVmYWE0MCwgMHg3YmY4Yjc1MiwgMHg3MmY1YmM1YywgMHgwNWJlZDUwNiwgMHgwY2IzZGUwOCwgMHgxN2E0YzMxYSwgMHgxZWE5YzgxNCwgMHgyMThhZjkzZSwgMHgyODg3ZjIzMCwgMHgzMzkwZWYyMiwgMHgzYTlkZTQyYywgMHhkZDA2M2Q5NiwgMHhkNDBiMzY5OCwgMHhjZjFjMmI4YSwgMHhjNjExMjA4NCwgMHhmOTMyMTFhZSwgMHhmMDNmMWFhMCwgMHhlYjI4MDdiMiwgMHhlMjI1MGNiYywgMHg5NTZlNjVlNiwgMHg5YzYzNmVlOCwgMHg4Nzc0NzNmYSwgMHg4ZTc5NzhmNCwgMHhiMTVhNDlkZSwgMHhiODU3NDJkMCwgMHhhMzQwNWZjMiwgMHhhYTRkNTRjYywgMHhlY2RhZjc0MSwgMHhlNWQ3ZmM0ZiwgMHhmZWMwZTE1ZCwgMHhmN2NkZWE1MywgMHhjOGVlZGI3OSwgMHhjMWUzZDA3NywgMHhkYWY0Y2Q2NSwgMHhkM2Y5YzY2YiwgMHhhNGIyYWYzMSwgMHhhZGJmYTQzZiwgMHhiNmE4YjkyZCwgMHhiZmE1YjIyMywgMHg4MDg2ODMwOSwgMHg4OThiODgwNywgMHg5MjljOTUxNSwgMHg5YjkxOWUxYiwgMHg3YzBhNDdhMSwgMHg3NTA3NGNhZiwgMHg2ZTEwNTFiZCwgMHg2NzFkNWFiMywgMHg1ODNlNmI5OSwgMHg1MTMzNjA5NywgMHg0YTI0N2Q4NSwgMHg0MzI5NzY4YiwgMHgzNDYyMWZkMSwgMHgzZDZmMTRkZiwgMHgyNjc4MDljZCwgMHgyZjc1MDJjMywgMHgxMDU2MzNlOSwgMHgxOTViMzhlNywgMHgwMjRjMjVmNSwgMHgwYjQxMmVmYiwgMHhkNzYxOGM5YSwgMHhkZTZjODc5NCwgMHhjNTdiOWE4NiwgMHhjYzc2OTE4OCwgMHhmMzU1YTBhMiwgMHhmYTU4YWJhYywgMHhlMTRmYjZiZSwgMHhlODQyYmRiMCwgMHg5ZjA5ZDRlYSwgMHg5NjA0ZGZlNCwgMHg4ZDEzYzJmNiwgMHg4NDFlYzlmOCwgMHhiYjNkZjhkMiwgMHhiMjMwZjNkYywgMHhhOTI3ZWVjZSwgMHhhMDJhZTVjMCwgMHg0N2IxM2M3YSwgMHg0ZWJjMzc3NCwgMHg1NWFiMmE2NiwgMHg1Y2E2MjE2OCwgMHg2Mzg1MTA0MiwgMHg2YTg4MWI0YywgMHg3MTlmMDY1ZSwgMHg3ODkyMGQ1MCwgMHgwZmQ5NjQwYSwgMHgwNmQ0NmYwNCwgMHgxZGMzNzIxNiwgMHgxNGNlNzkxOCwgMHgyYmVkNDgzMiwgMHgyMmUwNDMzYywgMHgzOWY3NWUyZSwgMHgzMGZhNTUyMCwgMHg5YWI3MDFlYywgMHg5M2JhMGFlMiwgMHg4OGFkMTdmMCwgMHg4MWEwMWNmZSwgMHhiZTgzMmRkNCwgMHhiNzhlMjZkYSwgMHhhYzk5M2JjOCwgMHhhNTk0MzBjNiwgMHhkMmRmNTk5YywgMHhkYmQyNTI5MiwgMHhjMGM1NGY4MCwgMHhjOWM4NDQ4ZSwgMHhmNmViNzVhNCwgMHhmZmU2N2VhYSwgMHhlNGYxNjNiOCwgMHhlZGZjNjhiNiwgMHgwYTY3YjEwYywgMHgwMzZhYmEwMiwgMHgxODdkYTcxMCwgMHgxMTcwYWMxZSwgMHgyZTUzOWQzNCwgMHgyNzVlOTYzYSwgMHgzYzQ5OGIyOCwgMHgzNTQ0ODAyNiwgMHg0MjBmZTk3YywgMHg0YjAyZTI3MiwgMHg1MDE1ZmY2MCwgMHg1OTE4ZjQ2ZSwgMHg2NjNiYzU0NCwgMHg2ZjM2Y2U0YSwgMHg3NDIxZDM1OCwgMHg3ZDJjZDg1NiwgMHhhMTBjN2EzNywgMHhhODAxNzEzOSwgMHhiMzE2NmMyYiwgMHhiYTFiNjcyNSwgMHg4NTM4NTYwZiwgMHg4YzM1NWQwMSwgMHg5NzIyNDAxMywgMHg5ZTJmNGIxZCwgMHhlOTY0MjI0NywgMHhlMDY5Mjk0OSwgMHhmYjdlMzQ1YiwgMHhmMjczM2Y1NSwgMHhjZDUwMGU3ZiwgMHhjNDVkMDU3MSwgMHhkZjRhMTg2MywgMHhkNjQ3MTM2ZCwgMHgzMWRjY2FkNywgMHgzOGQxYzFkOSwgMHgyM2M2ZGNjYiwgMHgyYWNiZDdjNSwgMHgxNWU4ZTZlZiwgMHgxY2U1ZWRlMSwgMHgwN2YyZjBmMywgMHgwZWZmZmJmZCwgMHg3OWI0OTJhNywgMHg3MGI5OTlhOSwgMHg2YmFlODRiYiwgMHg2MmEzOGZiNSwgMHg1ZDgwYmU5ZiwgMHg1NDhkYjU5MSwgMHg0ZjlhYTg4MywgMHg0Njk3YTM4ZF07XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0VG9JbnQzMihieXRlcykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgIChieXRlc1tpICAgIF0gPDwgMjQpIHxcbiAgICAgICAgICAgICAgICAoYnl0ZXNbaSArIDFdIDw8IDE2KSB8XG4gICAgICAgICAgICAgICAgKGJ5dGVzW2kgKyAyXSA8PCAgOCkgfFxuICAgICAgICAgICAgICAgICBieXRlc1tpICsgM11cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB2YXIgQUVTID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBBRVMpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAna2V5Jywge1xuICAgICAgICAgICAgdmFsdWU6IGNvZXJjZUFycmF5KGtleSwgdHJ1ZSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fcHJlcGFyZSgpO1xuICAgIH1cblxuXG4gICAgQUVTLnByb3RvdHlwZS5fcHJlcGFyZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgICAgIHZhciByb3VuZHMgPSBudW1iZXJPZlJvdW5kc1t0aGlzLmtleS5sZW5ndGhdO1xuICAgICAgICBpZiAocm91bmRzID09IG51bGwpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBrZXkgc2l6ZSAobXVzdCBiZSAxNiwgMjQgb3IgMzIgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbmNyeXB0aW9uIHJvdW5kIGtleXNcbiAgICAgICAgdGhpcy5fS2UgPSBbXTtcblxuICAgICAgICAvLyBkZWNyeXB0aW9uIHJvdW5kIGtleXNcbiAgICAgICAgdGhpcy5fS2QgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSByb3VuZHM7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5fS2UucHVzaChbMCwgMCwgMCwgMF0pO1xuICAgICAgICAgICAgdGhpcy5fS2QucHVzaChbMCwgMCwgMCwgMF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdW5kS2V5Q291bnQgPSAocm91bmRzICsgMSkgKiA0O1xuICAgICAgICB2YXIgS0MgPSB0aGlzLmtleS5sZW5ndGggLyA0O1xuXG4gICAgICAgIC8vIGNvbnZlcnQgdGhlIGtleSBpbnRvIGludHNcbiAgICAgICAgdmFyIHRrID0gY29udmVydFRvSW50MzIodGhpcy5rZXkpO1xuXG4gICAgICAgIC8vIGNvcHkgdmFsdWVzIGludG8gcm91bmQga2V5IGFycmF5c1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgS0M7IGkrKykge1xuICAgICAgICAgICAgaW5kZXggPSBpID4+IDI7XG4gICAgICAgICAgICB0aGlzLl9LZVtpbmRleF1baSAlIDRdID0gdGtbaV07XG4gICAgICAgICAgICB0aGlzLl9LZFtyb3VuZHMgLSBpbmRleF1baSAlIDRdID0gdGtbaV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBrZXkgZXhwYW5zaW9uIChmaXBzLTE5NyBzZWN0aW9uIDUuMilcbiAgICAgICAgdmFyIHJjb25wb2ludGVyID0gMDtcbiAgICAgICAgdmFyIHQgPSBLQywgdHQ7XG4gICAgICAgIHdoaWxlICh0IDwgcm91bmRLZXlDb3VudCkge1xuICAgICAgICAgICAgdHQgPSB0a1tLQyAtIDFdO1xuICAgICAgICAgICAgdGtbMF0gXj0gKChTWyh0dCA+PiAxNikgJiAweEZGXSA8PCAyNCkgXlxuICAgICAgICAgICAgICAgICAgICAgIChTWyh0dCA+PiAgOCkgJiAweEZGXSA8PCAxNikgXlxuICAgICAgICAgICAgICAgICAgICAgIChTWyB0dCAgICAgICAgJiAweEZGXSA8PCAgOCkgXlxuICAgICAgICAgICAgICAgICAgICAgICBTWyh0dCA+PiAyNCkgJiAweEZGXSAgICAgICAgXlxuICAgICAgICAgICAgICAgICAgICAgIChyY29uW3Jjb25wb2ludGVyXSA8PCAyNCkpO1xuICAgICAgICAgICAgcmNvbnBvaW50ZXIgKz0gMTtcblxuICAgICAgICAgICAgLy8ga2V5IGV4cGFuc2lvbiAoZm9yIG5vbi0yNTYgYml0KVxuICAgICAgICAgICAgaWYgKEtDICE9IDgpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IEtDOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGtbaV0gXj0gdGtbaSAtIDFdO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8ga2V5IGV4cGFuc2lvbiBmb3IgMjU2LWJpdCBrZXlzIGlzIFwic2xpZ2h0bHkgZGlmZmVyZW50XCIgKGZpcHMtMTk3KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IChLQyAvIDIpOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGtbaV0gXj0gdGtbaSAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0dCA9IHRrWyhLQyAvIDIpIC0gMV07XG5cbiAgICAgICAgICAgICAgICB0a1tLQyAvIDJdIF49IChTWyB0dCAgICAgICAgJiAweEZGXSAgICAgICAgXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKFNbKHR0ID4+ICA4KSAmIDB4RkZdIDw8ICA4KSBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoU1sodHQgPj4gMTYpICYgMHhGRl0gPDwgMTYpIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChTWyh0dCA+PiAyNCkgJiAweEZGXSA8PCAyNCkpO1xuXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IChLQyAvIDIpICsgMTsgaSA8IEtDOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGtbaV0gXj0gdGtbaSAtIDFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29weSB2YWx1ZXMgaW50byByb3VuZCBrZXkgYXJyYXlzXG4gICAgICAgICAgICB2YXIgaSA9IDAsIHIsIGM7XG4gICAgICAgICAgICB3aGlsZSAoaSA8IEtDICYmIHQgPCByb3VuZEtleUNvdW50KSB7XG4gICAgICAgICAgICAgICAgciA9IHQgPj4gMjtcbiAgICAgICAgICAgICAgICBjID0gdCAlIDQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fS2Vbcl1bY10gPSB0a1tpXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9LZFtyb3VuZHMgLSByXVtjXSA9IHRrW2krK107XG4gICAgICAgICAgICAgICAgdCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW52ZXJzZS1jaXBoZXItaWZ5IHRoZSBkZWNyeXB0aW9uIHJvdW5kIGtleSAoZmlwcy0xOTcgc2VjdGlvbiA1LjMpXG4gICAgICAgIGZvciAodmFyIHIgPSAxOyByIDwgcm91bmRzOyByKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgNDsgYysrKSB7XG4gICAgICAgICAgICAgICAgdHQgPSB0aGlzLl9LZFtyXVtjXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9LZFtyXVtjXSA9IChVMVsodHQgPj4gMjQpICYgMHhGRl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFUyWyh0dCA+PiAxNikgJiAweEZGXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgVTNbKHR0ID4+ICA4KSAmIDB4RkZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBVNFsgdHQgICAgICAgICYgMHhGRl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQUVTLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIGlmIChwbGFpbnRleHQubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcGxhaW50ZXh0IHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm91bmRzID0gdGhpcy5fS2UubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGEgPSBbMCwgMCwgMCwgMF07XG5cbiAgICAgICAgLy8gY29udmVydCBwbGFpbnRleHQgdG8gKGludHMgXiBrZXkpXG4gICAgICAgIHZhciB0ID0gY29udmVydFRvSW50MzIocGxhaW50ZXh0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHRbaV0gXj0gdGhpcy5fS2VbMF1baV07XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhcHBseSByb3VuZCB0cmFuc2Zvcm1zXG4gICAgICAgIGZvciAodmFyIHIgPSAxOyByIDwgcm91bmRzOyByKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYVtpXSA9IChUMVsodFsgaSAgICAgICAgIF0gPj4gMjQpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDJbKHRbKGkgKyAxKSAlIDRdID4+IDE2KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQzWyh0WyhpICsgMikgJSA0XSA+PiAgOCkgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUNFsgdFsoaSArIDMpICUgNF0gICAgICAgICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fS2Vbcl1baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdCA9IGEuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRoZSBsYXN0IHJvdW5kIGlzIHNwZWNpYWxcbiAgICAgICAgdmFyIHJlc3VsdCA9IGNyZWF0ZUFycmF5KDE2KSwgdHQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB0dCA9IHRoaXMuX0tlW3JvdW5kc11baV07XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgICAgXSA9IChTWyh0WyBpICAgICAgICAgXSA+PiAyNCkgJiAweGZmXSBeICh0dCA+PiAyNCkpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDFdID0gKFNbKHRbKGkgKyAxKSAlIDRdID4+IDE2KSAmIDB4ZmZdIF4gKHR0ID4+IDE2KSkgJiAweGZmO1xuICAgICAgICAgICAgcmVzdWx0WzQgKiBpICsgMl0gPSAoU1sodFsoaSArIDIpICUgNF0gPj4gIDgpICYgMHhmZl0gXiAodHQgPj4gIDgpKSAmIDB4ZmY7XG4gICAgICAgICAgICByZXN1bHRbNCAqIGkgKyAzXSA9IChTWyB0WyhpICsgMykgJSA0XSAgICAgICAgJiAweGZmXSBeICB0dCAgICAgICApICYgMHhmZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgQUVTLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24oY2lwaGVydGV4dCkge1xuICAgICAgICBpZiAoY2lwaGVydGV4dC5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjaXBoZXJ0ZXh0IHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm91bmRzID0gdGhpcy5fS2QubGVuZ3RoIC0gMTtcbiAgICAgICAgdmFyIGEgPSBbMCwgMCwgMCwgMF07XG5cbiAgICAgICAgLy8gY29udmVydCBwbGFpbnRleHQgdG8gKGludHMgXiBrZXkpXG4gICAgICAgIHZhciB0ID0gY29udmVydFRvSW50MzIoY2lwaGVydGV4dCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICAgICAgICB0W2ldIF49IHRoaXMuX0tkWzBdW2ldO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gYXBwbHkgcm91bmQgdHJhbnNmb3Jtc1xuICAgICAgICBmb3IgKHZhciByID0gMTsgciA8IHJvdW5kczsgcisrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGFbaV0gPSAoVDVbKHRbIGkgICAgICAgICAgXSA+PiAyNCkgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICBUNlsodFsoaSArIDMpICUgNF0gPj4gMTYpICYgMHhmZl0gXlxuICAgICAgICAgICAgICAgICAgICAgICAgVDdbKHRbKGkgKyAyKSAlIDRdID4+ICA4KSAmIDB4ZmZdIF5cbiAgICAgICAgICAgICAgICAgICAgICAgIFQ4WyB0WyhpICsgMSkgJSA0XSAgICAgICAgJiAweGZmXSBeXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9LZFtyXVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ID0gYS5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdGhlIGxhc3Qgcm91bmQgaXMgc3BlY2lhbFxuICAgICAgICB2YXIgcmVzdWx0ID0gY3JlYXRlQXJyYXkoMTYpLCB0dDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgICAgICAgIHR0ID0gdGhpcy5fS2Rbcm91bmRzXVtpXTtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSAgICBdID0gKFNpWyh0WyBpICAgICAgICAgXSA+PiAyNCkgJiAweGZmXSBeICh0dCA+PiAyNCkpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDFdID0gKFNpWyh0WyhpICsgMykgJSA0XSA+PiAxNikgJiAweGZmXSBeICh0dCA+PiAxNikpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDJdID0gKFNpWyh0WyhpICsgMikgJSA0XSA+PiAgOCkgJiAweGZmXSBeICh0dCA+PiAgOCkpICYgMHhmZjtcbiAgICAgICAgICAgIHJlc3VsdFs0ICogaSArIDNdID0gKFNpWyB0WyhpICsgMSkgJSA0XSAgICAgICAgJiAweGZmXSBeICB0dCAgICAgICApICYgMHhmZjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBFbGVjdG9uaWMgQ29kZWJvb2sgKEVDQilcbiAgICAgKi9cbiAgICB2YXIgTW9kZU9mT3BlcmF0aW9uRUNCID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlT2ZPcGVyYXRpb25FQ0IpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIkVsZWN0cm9uaWMgQ29kZSBCbG9ja1wiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcImVjYlwiO1xuXG4gICAgICAgIHRoaXMuX2FlcyA9IG5ldyBBRVMoa2V5KTtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25FQ0IucHJvdG90eXBlLmVuY3J5cHQgPSBmdW5jdGlvbihwbGFpbnRleHQpIHtcbiAgICAgICAgcGxhaW50ZXh0ID0gY29lcmNlQXJyYXkocGxhaW50ZXh0KTtcblxuICAgICAgICBpZiAoKHBsYWludGV4dC5sZW5ndGggJSAxNikgIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBwbGFpbnRleHQgc2l6ZSAobXVzdCBiZSBtdWx0aXBsZSBvZiAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjaXBoZXJ0ZXh0ID0gY3JlYXRlQXJyYXkocGxhaW50ZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9jayA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWludGV4dC5sZW5ndGg7IGkgKz0gMTYpIHtcbiAgICAgICAgICAgIGNvcHlBcnJheShwbGFpbnRleHQsIGJsb2NrLCAwLCBpLCBpICsgMTYpO1xuICAgICAgICAgICAgYmxvY2sgPSB0aGlzLl9hZXMuZW5jcnlwdChibG9jayk7XG4gICAgICAgICAgICBjb3B5QXJyYXkoYmxvY2ssIGNpcGhlcnRleHQsIGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNpcGhlcnRleHQ7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uRUNCLnByb3RvdHlwZS5kZWNyeXB0ID0gZnVuY3Rpb24oY2lwaGVydGV4dCkge1xuICAgICAgICBjaXBoZXJ0ZXh0ID0gY29lcmNlQXJyYXkoY2lwaGVydGV4dCk7XG5cbiAgICAgICAgaWYgKChjaXBoZXJ0ZXh0Lmxlbmd0aCAlIDE2KSAhPT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNpcGhlcnRleHQgc2l6ZSAobXVzdCBiZSBtdWx0aXBsZSBvZiAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwbGFpbnRleHQgPSBjcmVhdGVBcnJheShjaXBoZXJ0ZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZhciBibG9jayA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNpcGhlcnRleHQubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBjb3B5QXJyYXkoY2lwaGVydGV4dCwgYmxvY2ssIDAsIGksIGkgKyAxNik7XG4gICAgICAgICAgICBibG9jayA9IHRoaXMuX2Flcy5kZWNyeXB0KGJsb2NrKTtcbiAgICAgICAgICAgIGNvcHlBcnJheShibG9jaywgcGxhaW50ZXh0LCBpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbGFpbnRleHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBDaXBoZXIgQmxvY2sgQ2hhaW5pbmcgKENCQylcbiAgICAgKi9cbiAgICB2YXIgTW9kZU9mT3BlcmF0aW9uQ0JDID0gZnVuY3Rpb24oa2V5LCBpdikge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTW9kZU9mT3BlcmF0aW9uQ0JDKSkge1xuICAgICAgICAgICAgdGhyb3cgRXJyb3IoJ0FFUyBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJDaXBoZXIgQmxvY2sgQ2hhaW5pbmdcIjtcbiAgICAgICAgdGhpcy5uYW1lID0gXCJjYmNcIjtcblxuICAgICAgICBpZiAoIWl2KSB7XG4gICAgICAgICAgICBpdiA9IGNyZWF0ZUFycmF5KDE2KTtcblxuICAgICAgICB9IGVsc2UgaWYgKGl2Lmxlbmd0aCAhPSAxNikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGluaXRpYWxhdGlvbiB2ZWN0b3Igc2l6ZSAobXVzdCBiZSAxNiBieXRlcyknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2xhc3RDaXBoZXJibG9jayA9IGNvZXJjZUFycmF5KGl2LCB0cnVlKTtcblxuICAgICAgICB0aGlzLl9hZXMgPSBuZXcgQUVTKGtleSk7XG4gICAgfVxuXG4gICAgTW9kZU9mT3BlcmF0aW9uQ0JDLnByb3RvdHlwZS5lbmNyeXB0ID0gZnVuY3Rpb24ocGxhaW50ZXh0KSB7XG4gICAgICAgIHBsYWludGV4dCA9IGNvZXJjZUFycmF5KHBsYWludGV4dCk7XG5cbiAgICAgICAgaWYgKChwbGFpbnRleHQubGVuZ3RoICUgMTYpICE9PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcGxhaW50ZXh0IHNpemUgKG11c3QgYmUgbXVsdGlwbGUgb2YgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY2lwaGVydGV4dCA9IGNyZWF0ZUFycmF5KHBsYWludGV4dC5sZW5ndGgpO1xuICAgICAgICB2YXIgYmxvY2sgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwbGFpbnRleHQubGVuZ3RoOyBpICs9IDE2KSB7XG4gICAgICAgICAgICBjb3B5QXJyYXkocGxhaW50ZXh0LCBibG9jaywgMCwgaSwgaSArIDE2KTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCAxNjsgaisrKSB7XG4gICAgICAgICAgICAgICAgYmxvY2tbal0gXj0gdGhpcy5fbGFzdENpcGhlcmJsb2NrW2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9sYXN0Q2lwaGVyYmxvY2sgPSB0aGlzLl9hZXMuZW5jcnlwdChibG9jayk7XG4gICAgICAgICAgICBjb3B5QXJyYXkodGhpcy5fbGFzdENpcGhlcmJsb2NrLCBjaXBoZXJ0ZXh0LCBpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjaXBoZXJ0ZXh0O1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNCQy5wcm90b3R5cGUuZGVjcnlwdCA9IGZ1bmN0aW9uKGNpcGhlcnRleHQpIHtcbiAgICAgICAgY2lwaGVydGV4dCA9IGNvZXJjZUFycmF5KGNpcGhlcnRleHQpO1xuXG4gICAgICAgIGlmICgoY2lwaGVydGV4dC5sZW5ndGggJSAxNikgIT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjaXBoZXJ0ZXh0IHNpemUgKG11c3QgYmUgbXVsdGlwbGUgb2YgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcGxhaW50ZXh0ID0gY3JlYXRlQXJyYXkoY2lwaGVydGV4dC5sZW5ndGgpO1xuICAgICAgICB2YXIgYmxvY2sgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaXBoZXJ0ZXh0Lmxlbmd0aDsgaSArPSAxNikge1xuICAgICAgICAgICAgY29weUFycmF5KGNpcGhlcnRleHQsIGJsb2NrLCAwLCBpLCBpICsgMTYpO1xuICAgICAgICAgICAgYmxvY2sgPSB0aGlzLl9hZXMuZGVjcnlwdChibG9jayk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgMTY7IGorKykge1xuICAgICAgICAgICAgICAgIHBsYWludGV4dFtpICsgal0gPSBibG9ja1tqXSBeIHRoaXMuX2xhc3RDaXBoZXJibG9ja1tqXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29weUFycmF5KGNpcGhlcnRleHQsIHRoaXMuX2xhc3RDaXBoZXJibG9jaywgMCwgaSwgaSArIDE2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwbGFpbnRleHQ7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiAgTW9kZSBPZiBPcGVyYXRpb24gLSBDaXBoZXIgRmVlZGJhY2sgKENGQilcbiAgICAgKi9cbiAgICB2YXIgTW9kZU9mT3BlcmF0aW9uQ0ZCID0gZnVuY3Rpb24oa2V5LCBpdiwgc2VnbWVudFNpemUpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbkNGQikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiQ2lwaGVyIEZlZWRiYWNrXCI7XG4gICAgICAgIHRoaXMubmFtZSA9IFwiY2ZiXCI7XG5cbiAgICAgICAgaWYgKCFpdikge1xuICAgICAgICAgICAgaXYgPSBjcmVhdGVBcnJheSgxNik7XG5cbiAgICAgICAgfSBlbHNlIGlmIChpdi5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBpbml0aWFsYXRpb24gdmVjdG9yIHNpemUgKG11c3QgYmUgMTYgc2l6ZSknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc2VnbWVudFNpemUpIHsgc2VnbWVudFNpemUgPSAxOyB9XG5cbiAgICAgICAgdGhpcy5zZWdtZW50U2l6ZSA9IHNlZ21lbnRTaXplO1xuXG4gICAgICAgIHRoaXMuX3NoaWZ0UmVnaXN0ZXIgPSBjb2VyY2VBcnJheShpdiwgdHJ1ZSk7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNGQi5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICBpZiAoKHBsYWludGV4dC5sZW5ndGggJSB0aGlzLnNlZ21lbnRTaXplKSAhPSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgcGxhaW50ZXh0IHNpemUgKG11c3QgYmUgc2VnbWVudFNpemUgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5jcnlwdGVkID0gY29lcmNlQXJyYXkocGxhaW50ZXh0LCB0cnVlKTtcblxuICAgICAgICB2YXIgeG9yU2VnbWVudDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmNyeXB0ZWQubGVuZ3RoOyBpICs9IHRoaXMuc2VnbWVudFNpemUpIHtcbiAgICAgICAgICAgIHhvclNlZ21lbnQgPSB0aGlzLl9hZXMuZW5jcnlwdCh0aGlzLl9zaGlmdFJlZ2lzdGVyKTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5zZWdtZW50U2l6ZTsgaisrKSB7XG4gICAgICAgICAgICAgICAgZW5jcnlwdGVkW2kgKyBqXSBePSB4b3JTZWdtZW50W2pdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTaGlmdCB0aGUgcmVnaXN0ZXJcbiAgICAgICAgICAgIGNvcHlBcnJheSh0aGlzLl9zaGlmdFJlZ2lzdGVyLCB0aGlzLl9zaGlmdFJlZ2lzdGVyLCAwLCB0aGlzLnNlZ21lbnRTaXplKTtcbiAgICAgICAgICAgIGNvcHlBcnJheShlbmNyeXB0ZWQsIHRoaXMuX3NoaWZ0UmVnaXN0ZXIsIDE2IC0gdGhpcy5zZWdtZW50U2l6ZSwgaSwgaSArIHRoaXMuc2VnbWVudFNpemUpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZDtcbiAgICB9XG5cbiAgICBNb2RlT2ZPcGVyYXRpb25DRkIucHJvdG90eXBlLmRlY3J5cHQgPSBmdW5jdGlvbihjaXBoZXJ0ZXh0KSB7XG4gICAgICAgIGlmICgoY2lwaGVydGV4dC5sZW5ndGggJSB0aGlzLnNlZ21lbnRTaXplKSAhPSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgY2lwaGVydGV4dCBzaXplIChtdXN0IGJlIHNlZ21lbnRTaXplIGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBsYWludGV4dCA9IGNvZXJjZUFycmF5KGNpcGhlcnRleHQsIHRydWUpO1xuXG4gICAgICAgIHZhciB4b3JTZWdtZW50O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBsYWludGV4dC5sZW5ndGg7IGkgKz0gdGhpcy5zZWdtZW50U2l6ZSkge1xuICAgICAgICAgICAgeG9yU2VnbWVudCA9IHRoaXMuX2Flcy5lbmNyeXB0KHRoaXMuX3NoaWZ0UmVnaXN0ZXIpO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMuc2VnbWVudFNpemU7IGorKykge1xuICAgICAgICAgICAgICAgIHBsYWludGV4dFtpICsgal0gXj0geG9yU2VnbWVudFtqXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2hpZnQgdGhlIHJlZ2lzdGVyXG4gICAgICAgICAgICBjb3B5QXJyYXkodGhpcy5fc2hpZnRSZWdpc3RlciwgdGhpcy5fc2hpZnRSZWdpc3RlciwgMCwgdGhpcy5zZWdtZW50U2l6ZSk7XG4gICAgICAgICAgICBjb3B5QXJyYXkoY2lwaGVydGV4dCwgdGhpcy5fc2hpZnRSZWdpc3RlciwgMTYgLSB0aGlzLnNlZ21lbnRTaXplLCBpLCBpICsgdGhpcy5zZWdtZW50U2l6ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGxhaW50ZXh0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBNb2RlIE9mIE9wZXJhdGlvbiAtIE91dHB1dCBGZWVkYmFjayAoT0ZCKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25PRkIgPSBmdW5jdGlvbihrZXksIGl2KSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBNb2RlT2ZPcGVyYXRpb25PRkIpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQUVTIG11c3QgYmUgaW5zdGFuaXRhdGVkIHdpdGggYG5ld2AnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIk91dHB1dCBGZWVkYmFja1wiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcIm9mYlwiO1xuXG4gICAgICAgIGlmICghaXYpIHtcbiAgICAgICAgICAgIGl2ID0gY3JlYXRlQXJyYXkoMTYpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoaXYubGVuZ3RoICE9IDE2KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFsaWQgaW5pdGlhbGF0aW9uIHZlY3RvciBzaXplIChtdXN0IGJlIDE2IGJ5dGVzKScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fbGFzdFByZWNpcGhlciA9IGNvZXJjZUFycmF5KGl2LCB0cnVlKTtcbiAgICAgICAgdGhpcy5fbGFzdFByZWNpcGhlckluZGV4ID0gMTY7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbk9GQi5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICB2YXIgZW5jcnlwdGVkID0gY29lcmNlQXJyYXkocGxhaW50ZXh0LCB0cnVlKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY3J5cHRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xhc3RQcmVjaXBoZXJJbmRleCA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sYXN0UHJlY2lwaGVyID0gdGhpcy5fYWVzLmVuY3J5cHQodGhpcy5fbGFzdFByZWNpcGhlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFByZWNpcGhlckluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuY3J5cHRlZFtpXSBePSB0aGlzLl9sYXN0UHJlY2lwaGVyW3RoaXMuX2xhc3RQcmVjaXBoZXJJbmRleCsrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBlbmNyeXB0ZWQ7XG4gICAgfVxuXG4gICAgLy8gRGVjcnlwdGlvbiBpcyBzeW1ldHJpY1xuICAgIE1vZGVPZk9wZXJhdGlvbk9GQi5wcm90b3R5cGUuZGVjcnlwdCA9IE1vZGVPZk9wZXJhdGlvbk9GQi5wcm90b3R5cGUuZW5jcnlwdDtcblxuXG4gICAgLyoqXG4gICAgICogIENvdW50ZXIgb2JqZWN0IGZvciBDVFIgY29tbW9uIG1vZGUgb2Ygb3BlcmF0aW9uXG4gICAgICovXG4gICAgdmFyIENvdW50ZXIgPSBmdW5jdGlvbihpbml0aWFsVmFsdWUpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIENvdW50ZXIpKSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcignQ291bnRlciBtdXN0IGJlIGluc3Rhbml0YXRlZCB3aXRoIGBuZXdgJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBhbGxvdyAwLCBidXQgYW55dGhpbmcgZmFsc2UtaXNoIHVzZXMgdGhlIGRlZmF1bHQgMVxuICAgICAgICBpZiAoaW5pdGlhbFZhbHVlICE9PSAwICYmICFpbml0aWFsVmFsdWUpIHsgaW5pdGlhbFZhbHVlID0gMTsgfVxuXG4gICAgICAgIGlmICh0eXBlb2YoaW5pdGlhbFZhbHVlKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvdW50ZXIgPSBjcmVhdGVBcnJheSgxNik7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKGluaXRpYWxWYWx1ZSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Qnl0ZXMoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIENvdW50ZXIucHJvdG90eXBlLnNldFZhbHVlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZih2YWx1ZSkgIT09ICdudW1iZXInIHx8IHBhcnNlSW50KHZhbHVlKSAhPSB2YWx1ZSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIGNvdW50ZXIgdmFsdWUgKG11c3QgYmUgYW4gaW50ZWdlciknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFdlIGNhbm5vdCBzYWZlbHkgaGFuZGxlIG51bWJlcnMgYmV5b25kIHRoZSBzYWZlIHJhbmdlIGZvciBpbnRlZ2Vyc1xuICAgICAgICBpZiAodmFsdWUgPiBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnRlZ2VyIHZhbHVlIG91dCBvZiBzYWZlIHJhbmdlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpbmRleCA9IDE1OyBpbmRleCA+PSAwOyAtLWluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9jb3VudGVyW2luZGV4XSA9IHZhbHVlICUgMjU2O1xuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSAvIDI1Nik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBDb3VudGVyLnByb3RvdHlwZS5zZXRCeXRlcyA9IGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICAgIGJ5dGVzID0gY29lcmNlQXJyYXkoYnl0ZXMsIHRydWUpO1xuXG4gICAgICAgIGlmIChieXRlcy5sZW5ndGggIT0gMTYpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCBjb3VudGVyIGJ5dGVzIHNpemUgKG11c3QgYmUgMTYgYnl0ZXMpJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb3VudGVyID0gYnl0ZXM7XG4gICAgfTtcblxuICAgIENvdW50ZXIucHJvdG90eXBlLmluY3JlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTU7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fY291bnRlcltpXSA9PT0gMjU1KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY291bnRlcltpXSA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvdW50ZXJbaV0rKztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogIE1vZGUgT2YgT3BlcmF0aW9uIC0gQ291bnRlciAoQ1RSKVxuICAgICAqL1xuICAgIHZhciBNb2RlT2ZPcGVyYXRpb25DVFIgPSBmdW5jdGlvbihrZXksIGNvdW50ZXIpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE1vZGVPZk9wZXJhdGlvbkNUUikpIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKCdBRVMgbXVzdCBiZSBpbnN0YW5pdGF0ZWQgd2l0aCBgbmV3YCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiQ291bnRlclwiO1xuICAgICAgICB0aGlzLm5hbWUgPSBcImN0clwiO1xuXG4gICAgICAgIGlmICghKGNvdW50ZXIgaW5zdGFuY2VvZiBDb3VudGVyKSkge1xuICAgICAgICAgICAgY291bnRlciA9IG5ldyBDb3VudGVyKGNvdW50ZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jb3VudGVyID0gY291bnRlcjtcblxuICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5fcmVtYWluaW5nQ291bnRlckluZGV4ID0gMTY7XG5cbiAgICAgICAgdGhpcy5fYWVzID0gbmV3IEFFUyhrZXkpO1xuICAgIH1cblxuICAgIE1vZGVPZk9wZXJhdGlvbkNUUi5wcm90b3R5cGUuZW5jcnlwdCA9IGZ1bmN0aW9uKHBsYWludGV4dCkge1xuICAgICAgICB2YXIgZW5jcnlwdGVkID0gY29lcmNlQXJyYXkocGxhaW50ZXh0LCB0cnVlKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuY3J5cHRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3JlbWFpbmluZ0NvdW50ZXJJbmRleCA9PT0gMTYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1haW5pbmdDb3VudGVyID0gdGhpcy5fYWVzLmVuY3J5cHQodGhpcy5fY291bnRlci5fY291bnRlcik7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtYWluaW5nQ291bnRlckluZGV4ID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb3VudGVyLmluY3JlbWVudCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5jcnlwdGVkW2ldIF49IHRoaXMuX3JlbWFpbmluZ0NvdW50ZXJbdGhpcy5fcmVtYWluaW5nQ291bnRlckluZGV4KytdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGVuY3J5cHRlZDtcbiAgICB9XG5cbiAgICAvLyBEZWNyeXB0aW9uIGlzIHN5bWV0cmljXG4gICAgTW9kZU9mT3BlcmF0aW9uQ1RSLnByb3RvdHlwZS5kZWNyeXB0ID0gTW9kZU9mT3BlcmF0aW9uQ1RSLnByb3RvdHlwZS5lbmNyeXB0O1xuXG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIFBhZGRpbmdcblxuICAgIC8vIFNlZTpodHRwczovL3Rvb2xzLmlldGYub3JnL2h0bWwvcmZjMjMxNVxuICAgIGZ1bmN0aW9uIHBrY3M3cGFkKGRhdGEpIHtcbiAgICAgICAgZGF0YSA9IGNvZXJjZUFycmF5KGRhdGEsIHRydWUpO1xuICAgICAgICB2YXIgcGFkZGVyID0gMTYgLSAoZGF0YS5sZW5ndGggJSAxNik7XG4gICAgICAgIHZhciByZXN1bHQgPSBjcmVhdGVBcnJheShkYXRhLmxlbmd0aCArIHBhZGRlcik7XG4gICAgICAgIGNvcHlBcnJheShkYXRhLCByZXN1bHQpO1xuICAgICAgICBmb3IgKHZhciBpID0gZGF0YS5sZW5ndGg7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdFtpXSA9IHBhZGRlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBrY3M3c3RyaXAoZGF0YSkge1xuICAgICAgICBkYXRhID0gY29lcmNlQXJyYXkoZGF0YSwgdHJ1ZSk7XG4gICAgICAgIGlmIChkYXRhLmxlbmd0aCA8IDE2KSB7IHRocm93IG5ldyBFcnJvcignUEtDUyM3IGludmFsaWQgbGVuZ3RoJyk7IH1cblxuICAgICAgICB2YXIgcGFkZGVyID0gZGF0YVtkYXRhLmxlbmd0aCAtIDFdO1xuICAgICAgICBpZiAocGFkZGVyID4gMTYpIHsgdGhyb3cgbmV3IEVycm9yKCdQS0NTIzcgcGFkZGluZyBieXRlIG91dCBvZiByYW5nZScpOyB9XG5cbiAgICAgICAgdmFyIGxlbmd0aCA9IGRhdGEubGVuZ3RoIC0gcGFkZGVyO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZGRlcjsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtsZW5ndGggKyBpXSAhPT0gcGFkZGVyKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQS0NTIzcgaW52YWxpZCBwYWRkaW5nIGJ5dGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXN1bHQgPSBjcmVhdGVBcnJheShsZW5ndGgpO1xuICAgICAgICBjb3B5QXJyYXkoZGF0YSwgcmVzdWx0LCAwLCAwLCBsZW5ndGgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8gRXhwb3J0aW5nXG5cblxuICAgIC8vIFRoZSBibG9jayBjaXBoZXJcbiAgICB2YXIgYWVzanMgPSB7XG4gICAgICAgIEFFUzogQUVTLFxuICAgICAgICBDb3VudGVyOiBDb3VudGVyLFxuXG4gICAgICAgIE1vZGVPZk9wZXJhdGlvbjoge1xuICAgICAgICAgICAgZWNiOiBNb2RlT2ZPcGVyYXRpb25FQ0IsXG4gICAgICAgICAgICBjYmM6IE1vZGVPZk9wZXJhdGlvbkNCQyxcbiAgICAgICAgICAgIGNmYjogTW9kZU9mT3BlcmF0aW9uQ0ZCLFxuICAgICAgICAgICAgb2ZiOiBNb2RlT2ZPcGVyYXRpb25PRkIsXG4gICAgICAgICAgICBjdHI6IE1vZGVPZk9wZXJhdGlvbkNUUlxuICAgICAgICB9LFxuXG4gICAgICAgIHV0aWxzOiB7XG4gICAgICAgICAgICBoZXg6IGNvbnZlcnRIZXgsXG4gICAgICAgICAgICB1dGY4OiBjb252ZXJ0VXRmOFxuICAgICAgICB9LFxuXG4gICAgICAgIHBhZGRpbmc6IHtcbiAgICAgICAgICAgIHBrY3M3OiB7XG4gICAgICAgICAgICAgICAgcGFkOiBwa2NzN3BhZCxcbiAgICAgICAgICAgICAgICBzdHJpcDogcGtjczdzdHJpcFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIF9hcnJheVRlc3Q6IHtcbiAgICAgICAgICAgIGNvZXJjZUFycmF5OiBjb2VyY2VBcnJheSxcbiAgICAgICAgICAgIGNyZWF0ZUFycmF5OiBjcmVhdGVBcnJheSxcbiAgICAgICAgICAgIGNvcHlBcnJheTogY29weUFycmF5LFxuICAgICAgICB9XG4gICAgfTtcblxuXG4gICAgLy8gbm9kZS5qc1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBhZXNqc1xuXG4gICAgLy8gUmVxdWlyZUpTL0FNRFxuICAgIC8vIGh0dHA6Ly93d3cucmVxdWlyZWpzLm9yZy9kb2NzL2FwaS5odG1sXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FtZGpzL2FtZGpzLWFwaS93aWtpL0FNRFxuICAgIH0gZWxzZSBpZiAodHlwZW9mKGRlZmluZSkgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkgeyByZXR1cm4gYWVzanM7IH0pO1xuXG4gICAgLy8gV2ViIEJyb3dzZXJzXG4gICAgfSBlbHNlIHtcblxuICAgICAgICAvLyBJZiB0aGVyZSB3YXMgYW4gZXhpc3RpbmcgbGlicmFyeSBhdCBcImFlc2pzXCIgbWFrZSBzdXJlIGl0J3Mgc3RpbGwgYXZhaWxhYmxlXG4gICAgICAgIGlmIChyb290LmFlc2pzKSB7XG4gICAgICAgICAgICBhZXNqcy5fYWVzanMgPSByb290LmFlc2pzO1xuICAgICAgICB9XG5cbiAgICAgICAgcm9vdC5hZXNqcyA9IGFlc2pzO1xuICAgIH1cblxuXG59KSh0aGlzKTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFZQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==