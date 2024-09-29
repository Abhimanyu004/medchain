// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;


contract DoctorPatient{

    function sayHello() public pure returns(string memory){
        return "Hello World!";
    }

    //patient create account
    struct Patient {    
        address id;
        string name;
    }

    mapping(address => Patient) internal patients;

    function addPatient(string memory name) public {
        patients[msg.sender] = Patient(msg.sender, name);
    }

    function getPatient() public view returns(string memory name){
        return patients[msg.sender].name;
    }

    //doctor create account
    struct Doctor {
        address id;
        string name;
        string specialization;
    }

    mapping(address => Doctor) internal doctors;

    function addDoctor(string memory name, string memory spec) public {
        doctors[msg.sender] = Doctor(msg.sender, name, spec);
    }

    function getDoctor() public view returns(string memory name){
        return string(abi.encodePacked(doctors[msg.sender].name," ",doctors[msg.sender].specialization));
    }


    mapping(address => mapping(address => bool)) internal doctorPatientAccess;

    // patient add access to doctor
    function grantAccess(address docid) public  {
        require(msg.sender == patients[msg.sender].id, "Only the patient can grant access to their own data");
        doctorPatientAccess[msg.sender][docid] = true;
    }

    //patient removes doctor access
    function revokeAccess(address docid) public {
        require(msg.sender == patients[msg.sender].id, "Only the patient can grant access to their own data");
        doctorPatientAccess[msg.sender][docid] = false;
    }

    //to check if the doctor has acess to patient data
    function hasAccess(address patientId) public view returns (bool) {
        return doctorPatientAccess[patientId][msg.sender];
    }

    function hasAccessToMe(address doctorId) public view returns (bool) {
        return doctorPatientAccess[msg.sender][doctorId];
    }

    
    //doctor access patient data from global file system
    
}