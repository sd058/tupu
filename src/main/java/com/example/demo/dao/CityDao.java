package com.example.demo.dao;
import com.example.demo.bean.City;

import java.util.List;
public interface CityDao {
    City selectById(Integer id);
    List<City> selectAll();
    int insertCity(City city);
    int deleteCity(int id);
    int updateCity(City city);
}
