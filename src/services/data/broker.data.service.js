function createTcpAsyClBuffer(transactionId, unitId, registerValues) {
    let buffer = [];

    // Transaction ID
    buffer.push((transactionId >> 8) & 0xFF);
    buffer.push(transactionId & 0xFF);

    // Protocol ID
    buffer.push(0x00);
    buffer.push(0x00);

    // Length placeholder
    buffer.push(0x00);
    buffer.push(0x00);

    // Unit ID
    buffer.push(unitId);

    // Function Code (Read Holding Registers)
    buffer.push(0x03);

    // Byte Count placeholder
    buffer.push(0x00);

    registerValues.forEach(value => {

        if (typeof value === 'number') {
            // Handle as integer
            buffer.push((value >> 8) & 0xFF);
            buffer.push(value & 0xFF);
        }
        else {
            // Handle as float
            //console.log(value)
            let floatBytes = Buffer.alloc(4);
            floatBytes.writeFloatBE(parseFloat(value));
            buffer.push(...floatBytes);
        }
    });

    // Update Byte Count
    buffer[7] = buffer.length - 8;

    // Calculate the Length (total bytes following Unit ID to end of frame)
    let length = buffer.length - 6;
    buffer[4] = (length >> 8) & 0xFF;
    buffer[5] = length & 0xFF;

    return Buffer.from(buffer);
}
function convertToModbusTCP(dataArray) {
    let bufferLength = dataArray.length * 2;
    let buffer = Buffer.alloc(bufferLength);

    dataArray.forEach((value, index) => {
        // Use writeUInt16BE to accommodate values between 0 and 65535
        buffer.writeUInt16BE(value, index * 2);
    });

    return buffer;
}
function getSortedValues(sensorData) {
    return sensorData
        .filter(sensor => sensor.flag !== 'signal_strength') // Loại bỏ phần tử không mong muốn
        .sort((a, b) => {
            const numA = parseInt(a.flag.split('-')[1], 10);
            const numB = parseInt(b.flag.split('-')[1], 10);
            return numA - numB;
        })
        .map(sensor => sensor.value);  // Trích xuất và trả về chỉ giá trị value
}
function getResultDataFromByte(bytedata, type, mode = 0) {
    try {
        const dataView = new DataView(new Uint8Array(bytedata).buffer);
        if (mode === 0) {
            if (type === "total") {
                const left = dataView.getInt32(9, false);
                //console.log(left)
                const right = dataView.getInt32(13, false);
                const result = left + right / Math.pow(10, 6);
                return result.toFixed(2);
            } else if (type === "flow") {
                const fRate = dataView.getFloat32(17, false);
                return Math.round(fRate).toString();
            } else { // "speed"
               // const fSpeed = dataView.getFloat32(21, false) / 60;
                const fSpeed = dataView.getFloat32(23, false) / 60;
                return fSpeed.toFixed(2);
            }
        } else {
            if (type === "total") {
                const r = Math.random() * 2;
                fTotalWeight += r;
                return fTotalWeight.toFixed(2);
            } else if (type === "flow") {
                const fRate = Math.random() * 2;
                return Math.round(fRate).toString();
            } else { // "speed"
                const fSpeed = Math.random() * 2;
                return fSpeed.toFixed(2);
            }
        }
    } catch (error) {
        return "0.0";
    }
}
function preprocessRegisterValues(values) {
    return values.map(value => {
        if (typeof value === 'string') {
            // Try converting string to float
            return parseFloat(value);
        }
        return value; // Return integer as is
    });
}

async function exchangeData(data) {
    const sortedValue = getSortedValues(data)
    let dataResult = createTcpAsyClBuffer(1, 1, sortedValue)
    const total = getResultDataFromByte(dataResult, "total")
    const flow = getResultDataFromByte(dataResult, "flow")
    const speed = getResultDataFromByte(dataResult, "speed")
    return [
        { type: "total", value: total },
        { type: "flow", value: flow },
        { type: "speed", value: speed }
    ];
    
}
module.exports = {exchangeData}