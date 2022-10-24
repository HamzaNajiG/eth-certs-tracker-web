pragma solidity ^0.5.0;

contract Certs {



uint public certsCount =0;

    struct  Certificate  {
        uint id;
        string title;
        string date;
        string nameOfStudent;
        string universityName;

    }



  mapping(uint => Certificate) public certificates;

  // event TaskCreated(
  //   uint id,
  //   string content,
  //   bool completed
  // );

  // event TaskCompleted(
  //   uint id,
  //   bool completed
  // );

  constructor() public {
    addCertificate("Certificate Title","dd-mm-yyyy","StudentName","University Name");
  }

 function addCertificate(
     
    string memory _title,
    string memory _date,
    string  memory _nameOfStudent,
    string memory _universityName
    
    ) public {

    certsCount++;

    certificates[certsCount] = Certificate(certsCount,_title,_date,_nameOfStudent,_universityName);

}

  // function toggleCompleted(uint _id) public {
  //   Task memory _task = tasks[_id];
  //   _task.completed = !_task.completed;
  //   tasks[_id] = _task;
  //   emit TaskCompleted(_id, _task.completed);
  // }

}
