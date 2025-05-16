depts=("cse" "ecd" "cnd")
echo "3rd:"${depts[2]}
echo "count:"${#depts[*]}
echo "skip: "${depts[*]:1:2}
echo "replace: "${depts[*]/ecd/ece}
depts2=("${depts[*]/ecd/ece}")
echo "final rep:"${depts2[*]}
echo "sorted:"$(echo "${depts[*]}" | tr ' ' '\n' | sort)
