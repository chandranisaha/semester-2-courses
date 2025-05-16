clear
echo
read -p "Enter the City Name:" cityname
echo "Computer:" $HOSTNAME >> $HOSTNAME"_stats.txt"
echo "City:" $cityname
echo "Linux Kernel info:" `uname -a` >> $HOSTNAME"_stats.txt"
echo "Shell version:" $BASH_VERSION >> $HOSTNAME"_stats.txt"
clear
echo
echo $HOSTNAME"_stats.txt file written successfully."
echo
