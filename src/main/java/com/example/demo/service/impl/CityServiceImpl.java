package com.example.demo.service.impl;

import com.example.demo.bean.City;

import com.example.demo.dao.CityDao;
import com.example.demo.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityServiceImpl implements CityService {
    @Autowired
    private CityDao cityDao;

    @Override
    public City searchById(Integer id) {
        return cityDao.selectById(id);
    }

    @Override
    public List<City> searchAll() {
        return cityDao.selectAll();
    }

    @Override
    public Integer addCity(City city) {
        return cityDao.insertCity(city);
    }

    @Override
    public Integer deleteCity(Integer id) {
        return cityDao.deleteCity(id);
    }

    @Override
    public Integer updateCity(City updatedCity) {
        return cityDao.updateCity(updatedCity);
    }


}
