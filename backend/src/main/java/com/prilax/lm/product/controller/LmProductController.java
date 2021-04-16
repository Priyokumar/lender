package com.prilax.lm.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.prilax.lm.dto.ActionResponse;
import com.prilax.lm.product.dto.Product;
import com.prilax.lm.product.service.LmProductService;

@RestController
@RequestMapping("/api/v1/products")
public class LmProductController {

	@Autowired
	private LmProductService productService;

	@GetMapping
	public List<Product> findAllProducts() {
		return productService.findAllProducts();
	}

	@GetMapping(value = "/{id}")
	public Product findProduct(@PathVariable("id") Long id) {
		return productService.findProductById(id);
	}

	@PostMapping
	public ActionResponse createProduct(@RequestBody Product product) {
		return productService.createOrUpdateProduct(product, null);
	}

	@PutMapping(value = "/{id}")
	public ActionResponse updateProduct(@RequestBody Product product, @PathVariable("id") Long id) {
		return productService.createOrUpdateProduct(product, id);
	}

	@DeleteMapping(value = "/{id}")
	public ActionResponse deleteProduct(@PathVariable("id") Long id) {
		return productService.deleteProduct(id);
	}
}
