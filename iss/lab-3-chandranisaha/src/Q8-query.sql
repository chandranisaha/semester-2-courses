SELECT D.Dnumber, D.Dname, COUNT(E.Ssn) AS Employee_Count
FROM DEPARTMENT D
LEFT JOIN EMPLOYEE E ON D.Dnumber = E.Dno
GROUP BY D.Dnumber, D.Dname;
