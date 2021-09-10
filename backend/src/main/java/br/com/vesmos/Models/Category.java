package br.com.vesmos.Models;

import java.util.Date;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * Category model
 * 
 * @author Guilherme Vilela Oliveira <guivo11@gmail.com>
 */
@Entity
@Table(name="categories")
public class Category
{
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable=false)
    private String name;

    @Column(nullable=false)
    private String icon;
    
    @Column(nullable=false, name="badge_color")
    private String badgeColor;

    @OneToMany(mappedBy="category", cascade=CascadeType.ALL, orphanRemoval=true)
    private Set<Release> releases;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;
    
    @Column(name="created_at")
    @Temporal(TemporalType.TIMESTAMP)
	@CreationTimestamp
    private Date createdAt;

    @Column(name="updated_at")
    @Temporal(TemporalType.TIMESTAMP)
    @UpdateTimestamp
    private Date updatedAt;
    
    public void setName(String name)
    {
        this.name = name;
    }

    public String getName()
    {
        return name;
    }
    
    public void setIcon(String icon)
    {
        this.icon = icon;
    }

    public String getIcon()
    {
        return icon;
    }

    public void setBadgeColor(String badgeColor)
    {
        this.badgeColor = badgeColor;
    }

    public String getBadgeColor()
    {
        return badgeColor;
    } 
    public void setUser(User user)
    {
        this.user = user;
    }

    public User getUser()
    {
        return user;
    }
}
