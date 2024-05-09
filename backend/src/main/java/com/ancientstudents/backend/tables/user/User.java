package com.ancientstudents.backend.tables.user;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ancientstudents.backend.tables.token.Token;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;



@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;
  private String firstname;
  private String lastname;
  private String email;
  private String password;

  @Enumerated(EnumType.STRING)
  private Role role;

  @OneToMany(mappedBy = "user")
  private List<Token> tokens;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return role.getAuthorities();
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
// @Entity
// @Table(name="user")
// @Data
// @NoArgsConstructor
// public class UserEntity {
//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;
//     private String username;
//     private String password;
//     @Column(unique = true)
//     private String email;
    
//     // @ManyToMany( fetch = FetchType.EAGER, cascade = CascadeType.ALL)
//     // @JoinTable(name="user_departments", joinColumns = @JoinColumn(name="user_id",referencedColumnName = "id"),
//     //                 inverseJoinColumns = @JoinColumn(name =  "department_id", referencedColumnName = "id"))
//     // private List<Department> department =  new ArrayList<>();
// @ManyToMany( fetch = FetchType.EAGER, cascade = CascadeType.ALL)
// @JoinTable(name="user_departments", joinColumns = @JoinColumn(name="user_id",referencedColumnName = "id"),
//                 inverseJoinColumns = @JoinColumn(name =  "department_id", referencedColumnName = "id"))
// private List<Department> department =  new ArrayList<>();
    
// }
