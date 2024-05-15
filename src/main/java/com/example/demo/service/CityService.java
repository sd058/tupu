package com.example.demo.service;

import com.example.demo.bean.City;
import java.util.List;

public interface CityService {
    City searchById(Integer id);
    List<City> searchAll();
    Integer addCity(City city);
    Integer deleteCity(Integer id);
    Integer updateCity(City updatedCity);


}
