const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule('DoctorPatientModule', (m)=>{
    const DoctorPatientContract = m.contract("DoctorPatient", []);
    return {DoctorPatientContract};
});