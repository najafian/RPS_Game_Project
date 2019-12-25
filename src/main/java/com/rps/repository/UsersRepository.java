package com.rps.repository;


import com.rps.model.user.Users;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface UsersRepository extends CrudRepository<Users, Integer> {

    Optional<Users> findByUsername(String Name);
}
