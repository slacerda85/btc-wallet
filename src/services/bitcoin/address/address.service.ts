import KeyService from '../key/key.service';

export default class AddressService {
  readonly CHARSET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
  readonly GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];

  readonly encodings = {
    BECH32: "bech32",
    BECH32M: "bech32m",
  };
    
  
  getEncodingConst (enc: string) {
    if (enc == this.encodings.BECH32) {
      return 1;
    } else if (enc == this.encodings.BECH32M) {
      return 0x2bc830a3;
    } else {
      return null;
    }
  }
  
   polymod(values: string | any[]) {
    var chk = 1;
    for (var p = 0; p < values.length; ++p) {
      var top = chk >> 25;
      chk = (chk & 0x1ffffff) << 5 ^ values[p];
      for (var i = 0; i < 5; ++i) {
        if ((top >> i) & 1) {
          chk ^= this.GENERATOR[i];
        }
      }
    }
    return chk;
  }
  
   hrpExpand (hrp: string) {
    var ret = [];
    var p;
    for (p = 0; p < hrp.length; ++p) {
      ret.push(hrp.charCodeAt(p) >> 5);
    }
    ret.push(0);
    for (p = 0; p < hrp.length; ++p) {
      ret.push(hrp.charCodeAt(p) & 31);
    }
    return ret;
  }
  
   verifyChecksum (hrp: string, data: ConcatArray<number>, enc: string) {
    return this.polymod(this.hrpExpand(hrp).concat(data)) === this.getEncodingConst(enc);
  }
  
   createChecksum (hrp: string, data: ConcatArray<number>, enc: string) {
    var values = this.hrpExpand(hrp).concat(data).concat([0, 0, 0, 0, 0, 0]);
    var mod = this.polymod(values) ^ (this.getEncodingConst(enc) || 1);
    var ret = [];
    for (var p = 0; p < 6; ++p) {
      ret.push((mod >> 5 * (5 - p)) & 31);
    }
    return ret;
  }
  
   encode (hrp: string, data: any, enc: string) {
    var combined = data.concat(this.createChecksum(hrp, data, enc));
    var ret = hrp + '1';
    for (var p = 0; p < combined.length; ++p) {
      ret += this.CHARSET.charAt(combined[p]);
    }
    return ret;
  }
  
   decode (bechString: string, enc: string) {
    var p;
    var has_lower = false;
    var has_upper = false;
    for (p = 0; p < bechString.length; ++p) {
      if (bechString.charCodeAt(p) < 33 || bechString.charCodeAt(p) > 126) {
        return null;
      }
      if (bechString.charCodeAt(p) >= 97 && bechString.charCodeAt(p) <= 122) {
          has_lower = true;
      }
      if (bechString.charCodeAt(p) >= 65 && bechString.charCodeAt(p) <= 90) {
          has_upper = true;
      }
    }
    if (has_lower && has_upper) {
      return null;
    }
    bechString = bechString.toLowerCase();
    var pos = bechString.lastIndexOf('1');
    if (pos < 1 || pos + 7 > bechString.length || bechString.length > 90) {
      return null;
    }
    var hrp = bechString.substring(0, pos);
    var data = [];
    for (p = pos + 1; p < bechString.length; ++p) {
      var d = this.CHARSET.indexOf(bechString.charAt(p));
      if (d === -1) {
        return null;
      }
      data.push(d);
    }
    if (!this.verifyChecksum(hrp, data, enc)) {
      return null;
    }
    return {hrp: hrp, data: data.slice(0, data.length - 6)};
  }
  
}

// example

const addressService = new AddressService();
const hrp = 'bc';
const data = [
  0x00, 0x14, 0x3d, 0x8d, 0x7f
]
const enc = addressService.encodings.BECH32;
const address = addressService.encode(hrp, data, enc);
console.log(address); // bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq
