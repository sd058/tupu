package com.example.demo.controller;


import com.example.demo.bean.City;

import com.example.demo.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@Controller
@CrossOrigin
@RequestMapping("/city")
public class CityController {

    @GetMapping("/")
    public String index() {
        return "forward:index.html";
    }
    @Autowired
    private CityService cityService;

    @RequestMapping("/one")
    @ResponseBody
    public City getOne(Integer id){
        return cityService.searchById(id);
    }
//
    @RequestMapping("/all")
    @ResponseBody
    public List<City> getall(){
        return cityService.searchAll();
    }

    @RequestMapping("/add")
    @ResponseBody
    public RedirectView addCity(City city){
        //return cityService.addCity(city);
        //return "添加成功";

        // 等待2秒（2000毫秒）
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 返回重定向视图，将用户重定向到首页
        return new RedirectView("/city.html");
    }

    @RequestMapping("/delete")
    @ResponseBody
    public Integer deleteCity(int id){
        return cityService.deleteCity(id);//

    }

    @RequestMapping("/update")
    @ResponseBody
    public RedirectView updateCity(City city){
       // return cityService.updateCity(city);
       // return "更新成功";
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // 返回重定向视图，将用户重定向到首页
        return new RedirectView("/city.html");
    }

}
