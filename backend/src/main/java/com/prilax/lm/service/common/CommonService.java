package com.prilax.lm.service.common;

import java.util.List;

import com.prilax.lm.vo.Filter;

public interface CommonService {

	public <T> T findById(Long id, Class<?> clazz);

	public <T> T findOne(List<Filter> filters, Class<?> clazz);

	public <T> List<T> findAll(Class<?> clazz);

	public <T> List<T> find(List<Filter> filters, Class<?> clazz);

	public <T> T save(Object entity);

	public void delete(Object entity);

}
