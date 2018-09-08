cd /Users/zhangzhigang/Desktop/workspace/zzgzzg00.github.io/FE/2018/elec/update
version=$(sed -n '/"version"/p;s/version//p' package.json)
echo $version