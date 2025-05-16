CREATE OR REPLACE VIEW Department_Manager_Salary AS
SELECT D.Dname, E.Fname AS Manager_Fname, E.Lname AS Manager_Lname, E.Salary AS Manager_Salary
FROM DEPARTMENT D
JOIN EMPLOYEE E ON D.Mgr_ssn = E.Ssn;
