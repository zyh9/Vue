<?php


// 定义数组模拟商品信息
$data = [
	["id"=>1,"title"=>"打火机","price"=>"99","pic"=>"img/1.jpg"],
	["id"=>2,"title"=>"电脑","price"=>"9999","pic"=>"img/2.jpg"],
	["id"=>3,"title"=>"手机","price"=>"3888","pic"=>"img/3.jpg"],
	["id"=>4,"title"=>"手机壳","price"=>"999","pic"=>"img/4.jpg"],
	["id"=>5,"title"=>"电池","price"=>"333","pic"=>"img/5.jpg"],
	["id"=>6,"title"=>"插座","price"=>"69","pic"=>"img/6.jpg"],
];
// 输出json数据
echo json_encode($data);

