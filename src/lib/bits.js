export class StateBits {
    // value = 0|0; // Turn to 32 bit range0;

    // constructor(obj) {
    //     this.value = this.calcValue(obj);
    // }

    static calcValue(obj) {
        let val = 0;
        for (var property in obj) {
            if (StateBits.metaData.hasOwnProperty(property)){
                let field = StateBits.metaData[property];
                val = obj[property] | 0; // to convert true/false into 1/0
                val |= val << field.offset;
            }
        }
        return val;
    }

    static calcObject(value){
        let retObj = {};
        for (var key in StateBits.metaData){
        // StateBits.metaData.forEach(element => {
            // const key = Object.keys(element)[0];
            const keyValue = StateBits.metaData[key];
            let field = ((1 << keyValue.size) - 1) << keyValue.offset;
            field = (value & field) >>> keyValue.offset;
            if (field !== 0) retObj[key] = field; 
        // });
        };
        return retObj;
    }

    // toString(radix = 2){
    //     return this.value.toString(radix);
    // }

    // getValue(){ return this.value;}
    // // set value(val){this.value = val;}

    static metaData = 
    {
        lt: {offset: 0, size: 3, name: 'learnt'},
        bn: {offset: 3, size: 10, name: 'batch'}, // bn = 0 - undivided into lessons/batches
        ex: {offset: 13, size: 1, name: 'excluded'/*, values:[]*/},
    };
}