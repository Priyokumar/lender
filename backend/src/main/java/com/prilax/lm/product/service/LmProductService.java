package com.prilax.lm.product.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.dto.ApiUtil;
import com.prilax.lm.dto.error.NotFoundException;
import com.prilax.lm.product.dto.Product;
import com.prilax.lm.product.entity.LmProduct;
import com.prilax.lm.service.common.CommonService;
import com.prilax.lm.util.LmUtil;

@Service
public class LmProductService {

	@Autowired
	private CommonService commonService;

	ModelMapper modelMapper = new ModelMapper();

	public List<Product> findAllProducts() {

		List<LmProduct> products = commonService.findAll(LmProduct.class);

		List<Product> productsDto = new ArrayList<>();
		products.forEach(customer -> {
			Product productDto = setProductToDto(customer);
			productsDto.add(productDto);
		});

		return productsDto;
	}

	public Product findProductById(Long id) {

		LmProduct product = commonService.findById(id, LmProduct.class);

		if (!LmUtil.isAllPresent(product))
			throw new NotFoundException("No product can be found !");

		Product productDto = setProductToDto(product);

		return productDto;
	}

	public ActionResponse createOrUpdateProduct(Product productDto, Long id) {

		ActionResponse res = new ActionResponse();

		LmProduct product = modelMapper.map(productDto, LmProduct.class);
		
		
		if(LmUtil.isAllPresent(id)) {
			LmProduct productOld = commonService.findById(id, LmProduct.class);
			product.setId(id);
			if(!LmUtil.isAllPresent(productOld.getProductId())) {
				product.setProductId(LmUtil.getGeneratedNumber("PROD"));
			} else {
				product.setProductId(productOld.getProductId());
			}
		} else {
			product.setProductId(LmUtil.getGeneratedNumber("PROD"));
		}
		product.setId(id);

		commonService.save(product);
		String message = "";
		if (LmUtil.isAllPresent(id)) {
			message = "Successfully updated Product data";
			res.setApiMessage(ApiUtil.okMessage(message));
		} else {
			message = "Successfully created Product";
			res.setApiMessage(ApiUtil.createdMessage(message));
			res.setActionMessage(message);
		}
		return res;
	}

	public ActionResponse deleteProduct(Long id) {

		ActionResponse res = new ActionResponse();

		LmProduct product = commonService.findById(id, LmProduct.class);

		if (!LmUtil.isAllPresent(product))
			throw new NotFoundException("No Product can be found !");

		commonService.delete(product);

		res.setActionMessage("Product has been deleted successfully");
		res.setApiMessage(ApiUtil.okMessage("Product has been deleted successfully"));
		return res;
	}

	private Product setProductToDto(LmProduct product) {

		Product productDto = modelMapper.map(product, Product.class);

		return productDto;
	}

}
