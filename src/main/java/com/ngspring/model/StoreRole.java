package com.ngspring.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name="role")
public class StoreRole {
	
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    private String role;

    @ManyToMany(mappedBy = "roles",fetch = FetchType.LAZY)
    @JsonBackReference
    private Set<StoreUser> users;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public Set<StoreUser> getUsers() {
		return users;
	}

	public void setUsers(Set<StoreUser> users) {
		this.users = users;
	}

}
