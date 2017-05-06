package com.ngspring.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private long id;
	
	@Column(name="barCode", unique=true)
	@NotNull
	private String barCode;
	
	@NotNull
	private String name;
	
	@NotNull
	private String measurementUnit;
	
	@NotNull
	private Double entryCost;
	
	@NotNull
	private Double saleCost;
	
	@NotNull
	private Integer quantity;
	
	private String description;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBarCode() {
		return barCode;
	}

	public void setBarCode(String barCode) {
		this.barCode = barCode;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getMeasurementUnit() {
		return measurementUnit;
	}

	public void setMeasurementUnit(String measurementUnit) {
		this.measurementUnit = measurementUnit;
	}

	public Double getEntryCost() {
		return entryCost;
	}

	public void setEntryCost(Double entryCost) {
		this.entryCost = entryCost;
	}

	public Double getSaleCost() {
		return saleCost;
	}

	public void setSaleCost(Double saleCost) {
		this.saleCost = saleCost;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
}
