SELECT E.Fname AS Employee_Fname, E.Lname AS Employee_Lname, S.Fname AS Supervisor_Fname, S.Lname AS Supervisor_Lname
FROM EMPLOYEE E
JOIN EMPLOYEE S ON E.Super_ssn = S.Ssn;
