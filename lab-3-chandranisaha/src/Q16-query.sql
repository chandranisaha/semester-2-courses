SELECT E.Fname, E.Lname
FROM EMPLOYEE E
JOIN EMPLOYEE J ON E.Dno = J.Dno
WHERE J.Fname = 'John' AND J.Lname = 'Smith';
